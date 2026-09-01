import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Calendar from './components/Calendar';
import RenderCounter from './components/RenderCounter';
import ControlPanel from './components/ControlPanel';
import { fetchEvents, moveEvent, addEvent } from './store/slices/eventsSlice';

function App() {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  
  const [isOptimized, setIsOptimized] = useState(true);
  const [isCounting, setIsCounting] = useState(true);
  const [renderCount, setRenderCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  // ✅ DEFINE incrementRender FIRST
  const incrementRender = useCallback(() => {
    if (isCounting) {
      setRenderCount(prev => prev + 1);
    }
  }, [isCounting]);

  // ✅ THEN use it in useEffect
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // ✅ Listen for drag & drop events (AFTER incrementRender is defined)
  useEffect(() => {
    const handleMoveEvent = (e) => {
      const { id, newDate } = e.detail;
      console.log(`🔄 Moving event ${id} to ${newDate}`);
      dispatch(moveEvent({ id, newDate }));
      incrementRender();
    };

    document.addEventListener('moveEvent', handleMoveEvent);

    return () => {
      document.removeEventListener('moveEvent', handleMoveEvent);
    };
  }, [dispatch, incrementRender]); // ← Add incrementRender to dependencies

  // ✅ Add event handler
  const handleAddEvent = useCallback((eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      createdAt: new Date().toISOString()
    };
    dispatch(addEvent(newEvent));
    incrementRender();
    console.log('✅ New event added:', newEvent);
  }, [dispatch, incrementRender]);

  // ✅ Toggle handlers
  const toggleOptimization = useCallback((value) => {
    setIsOptimized(value);
    setRenderCount(0);
  }, []);

  const toggleCounting = useCallback((value) => {
    setIsCounting(value);
    if (!value) {
      setRenderCount(0);
    }
  }, []);

  // ✅ Memoized calendar props
  const calendarProps = useMemo(() => ({
    events,
    currentDate,
    setCurrentDate,
    incrementRender,
    isOptimized
  }), [events, currentDate, incrementRender, isOptimized]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>📅 Calendar Scheduler</h1>
        <p>
          {isOptimized ? '⚡ Optimized Mode' : '🐌 Non-Optimized Mode'} 
          | Drag & Drop | Performance Monitor
        </p>
      </header>

      <main className="app-main">
        <div className="app-content">
          <aside className="app-sidebar">
            <ControlPanel
              isOptimized={isOptimized}
              onToggleOptimization={toggleOptimization}
              isCounting={isCounting}
              onToggleCounting={toggleCounting}
              onAddEvent={handleAddEvent}
            />
            <RenderCounter 
              count={renderCount} 
              isCounting={isCounting}
              label="Total Renders"
            />
            <div className="info-box">
              <h4>📊 Performance Info</h4>
              <p><strong>Mode:</strong> {isOptimized ? '⚡ Optimized' : '🐌 Non-Optimized'}</p>
              <p><strong>Events:</strong> {events.length}</p>
              <p><strong>Tracking:</strong> {isCounting ? '✅ On' : '⏸️ Paused'}</p>
              <p><strong>React.memo:</strong> {isOptimized ? '✅ Active' : '❌ Disabled'}</p>
              <p><strong>useMemo/useCallback:</strong> {isOptimized ? '✅ Active' : '❌ Disabled'}</p>
              <p style={{ fontSize: '0.8rem', color: '#28a745', marginTop: '0.5rem' }}>
                💡 Click "Create New Post" to add events!
              </p>
            </div>
          </aside>

          <section className="app-calendar">
            <Calendar {...calendarProps} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
import React, { useState, memo } from 'react';

const CalendarDay = memo(({ 
  date, 
  events, 
  isOtherMonth, 
  onEventClick,
  incrementRender,
  EventComponent,
  isOptimized 
}) => {
  console.log('CalendarDay rendered for', date.toISOString().split('T')[0], isOptimized ? '(Optimized)' : '(Non-Optimized)');

  const [isDragging, setIsDragging] = useState(false);
  const isToday = new Date().toISOString().split('T')[0] === date.toISOString().split('T')[0];
  const dayNumber = date.getDate();

  const handleClick = () => {
    incrementRender();
  };

  const handleDragStart = (e, eventId) => {
    e.dataTransfer.setData('text/plain', eventId);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    incrementRender();
    console.log(`🔴 Drag started for event ${eventId}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    incrementRender();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData('text/plain');
    const newDate = date.toISOString().split('T')[0];
    
    console.log(`📥 Dropped event ${eventId} on ${newDate}`);
    
    // Dispatch the move event
    const moveEvent = new CustomEvent('moveEvent', { 
      detail: { id: parseInt(eventId), newDate } 
    });
    document.dispatchEvent(moveEvent);
    
    setIsDragging(false);
    incrementRender();
  };

  return (
    <div
      style={{
        ...styles.day,
        background: isOtherMonth ? '#f8f9fa' : 'white',
        color: isOtherMonth ? '#adb5bd' : '#333',
        border: isToday ? '2px solid #667eea' : '1px solid #e9ecef',
        opacity: isDragging ? '0.5' : '1'
      }}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div style={styles.dayNumber}>{dayNumber}</div>
      <div style={styles.eventsContainer}>
        {events.map(event => (
          <EventComponent
            key={event.id}
            event={event}
            onClick={() => onEventClick(event)}
            onDragStart={(e) => handleDragStart(e, event.id)}
            incrementRender={incrementRender}
          />
        ))}
      </div>
    </div>
  );
});

const styles = {
  day: {
    minHeight: '100px',
    padding: '4px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative'
  },
  dayNumber: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    marginBottom: '2px',
    color: '#555'
  },
  eventsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  }
};

export default CalendarDay;
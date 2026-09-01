import React, { useState, useCallback, useMemo, memo } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';

const Calendar = memo(({ events, currentDate, setCurrentDate, incrementRender, isOptimized }) => {
  console.log('Calendar rendered', isOptimized ? '(Optimized)' : '(Non-Optimized)');

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDaysInMonth = useCallback((date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = firstDay.getDay() - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ date: d, isOtherMonth: true });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i);
      days.push({ date: d, isOtherMonth: false });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, isOtherMonth: true });
    }

    return days;
  }, []);

  const days = useMemo(() => getDaysInMonth(currentDate), [currentDate, getDaysInMonth]);

  const getEventsForDate = useCallback((date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  }, [events]);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    incrementRender();
  }, [incrementRender]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  const handleDateChange = useCallback((newDate) => {
    setCurrentDate(newDate);
    incrementRender();
  }, [setCurrentDate, incrementRender]);

  const CalendarGridComponent = useMemo(() => {
    return (
      <CalendarGrid
        days={days}
        events={events}
        getEventsForDate={getEventsForDate}
        onEventClick={handleEventClick}
        isOptimized={isOptimized}
        incrementRender={incrementRender}
      />
    );
  }, [days, events, getEventsForDate, handleEventClick, isOptimized, incrementRender]);

  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={handleDateChange}
        incrementRender={incrementRender}
        isOptimized={isOptimized}
      />
      {CalendarGridComponent}
      
      {isModalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleCloseModal}
          incrementRender={incrementRender}
          isOptimized={isOptimized}
        />
      )}
    </div>
  );
});

export default Calendar;
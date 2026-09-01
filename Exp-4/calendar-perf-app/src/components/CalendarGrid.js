import React, { memo } from 'react';
import CalendarDay from './CalendarDay';
import OptimizedEvent from './OptimizedEvent';
import NonOptimizedEvent from './NonOptimizedEvent';

const CalendarGrid = memo(({ 
  days, 
  events, 
  getEventsForDate, 
  onEventClick,
  isOptimized,
  incrementRender 
}) => {
  console.log('CalendarGrid rendered', isOptimized ? '(Optimized)' : '(Non-Optimized)');
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const EventComponent = isOptimized ? OptimizedEvent : NonOptimizedEvent;

  return (
    <div style={styles.container}>
      <div style={styles.weekHeader}>
        {weekDays.map(day => (
          <div key={day} style={styles.weekDay}>{day}</div>
        ))}
      </div>

      <div style={styles.grid}>
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day.date);
          return (
            <CalendarDay
              key={index}
              date={day.date}
              events={dayEvents}
              isOtherMonth={day.isOtherMonth}
              onEventClick={onEventClick}
              incrementRender={incrementRender}
              EventComponent={EventComponent}
              isOptimized={isOptimized}
            />
          );
        })}
      </div>
    </div>
  );
});

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  weekHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
    marginBottom: '4px'
  },
  weekDay: {
    padding: '0.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
    fontSize: '0.9rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px'
  }
};

export default CalendarGrid;
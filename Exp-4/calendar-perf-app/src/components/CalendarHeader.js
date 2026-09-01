import React, { memo } from 'react';

const CalendarHeader = memo(({ currentDate, onDateChange, incrementRender, isOptimized }) => {
  console.log('CalendarHeader rendered', isOptimized ? '(Optimized)' : '(Non-Optimized)');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
    incrementRender();
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
    incrementRender();
  };

  const handleToday = () => {
    onDateChange(new Date());
    incrementRender();
  };

  return (
    <div style={styles.container}>
      <button onClick={handleToday} style={styles.todayBtn}>
        Today
      </button>
      <div style={styles.navigation}>
        <button onClick={handlePrevMonth} style={styles.navBtn}>
          ◀
        </button>
        <h2 style={styles.title}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} style={styles.navBtn}>
          ▶
        </button>
      </div>
    </div>
  );
});

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #e9ecef'
  },
  todayBtn: {
    padding: '0.4rem 1rem',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  navBtn: {
    padding: '0.3rem 0.8rem',
    background: '#e9ecef',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    minWidth: '150px',
    textAlign: 'center'
  }
};

export default CalendarHeader;
import React, { memo } from 'react';

const RenderCounter = memo(({ count, isCounting, label = 'Renders' }) => {
  console.log('RenderCounter rendered');

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>📊 {label}</h4>
      <div style={styles.countDisplay}>
        <span style={styles.countNumber}>{count}</span>
        <span style={styles.countLabel}>times</span>
      </div>
      <div style={styles.status}>
        <span style={{
          ...styles.statusDot,
          background: isCounting ? '#28a745' : '#dc3545'
        }}></span>
        <span style={styles.statusText}>
          {isCounting ? 'Counting active' : 'Paused'}
        </span>
      </div>
    </div>
  );
});

const styles = {
  container: {
    background: 'white',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  title: {
    marginBottom: '0.5rem',
    color: '#333',
    fontSize: '0.95rem'
  },
  countDisplay: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem'
  },
  countNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#667eea'
  },
  countLabel: {
    fontSize: '0.9rem',
    color: '#888'
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'inline-block'
  },
  statusText: {
    fontSize: '0.8rem',
    color: '#888'
  }
};

export default RenderCounter;
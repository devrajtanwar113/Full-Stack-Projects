import React, { memo } from 'react';

const EventModal = memo(({ event, onClose, incrementRender, isOptimized }) => {
  console.log('EventModal rendered', isOptimized ? '(Optimized)' : '(Non-Optimized)');

  const handleClose = () => {
    onClose();
    incrementRender();
  };

  const getCategoryColor = (category) => {
    const colors = {
      Work: '#667eea',
      Personal: '#28a745',
      Social: '#ffc107',
      Marketing: '#dc3545'
    };
    return colors[category] || '#6c757d';
  };

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={{ ...styles.title, borderBottom: `4px solid ${getCategoryColor(event.category)}` }}>
            {event.title}
          </h2>
          <button onClick={handleClose} style={styles.closeBtn}>×</button>
        </div>
        
        <div style={styles.body}>
          <p><strong>📅 Date:</strong> {event.date}</p>
          <p><strong>📂 Category:</strong> {event.category}</p>
          <p><strong>📌 Status:</strong> {event.status}</p>
          <p><strong>📝 Description:</strong> {event.description}</p>
        </div>

        <div style={styles.footer}>
          <button onClick={handleClose} style={styles.closeModalBtn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    width: '450px',
    maxWidth: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '1.3rem',
    paddingBottom: '0.5rem'
  },
  closeBtn: {
    fontSize: '2rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
    padding: '0 0.5rem'
  },
  body: {
    marginBottom: '1.5rem'
  },
  body: {
    marginBottom: '1.5rem',
    lineHeight: '1.8'
  },
  footer: {
    textAlign: 'right'
  },
  closeModalBtn: {
    padding: '0.6rem 1.5rem',
    background: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default EventModal;
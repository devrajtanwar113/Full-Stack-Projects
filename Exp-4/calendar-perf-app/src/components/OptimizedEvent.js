import React, { memo } from 'react';

const OptimizedEvent = memo(({ event, onClick, onDragStart, incrementRender }) => {
  console.log('✅ OptimizedEvent rendered:', event.id);
  
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
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

  const getStatusColor = (status) => {
    const colors = {
      draft: '#ffc107',
      scheduled: '#17a2b8',
      published: '#28a745'
    };
    return colors[status] || '#6c757d';
  };

  return (
    <div
      style={{
        ...styles.event,
        borderLeftColor: getCategoryColor(event.category)
      }}
      onClick={handleClick}
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        onDragStart(e);
      }}
      title="Drag to move to another date"
    >
      <div style={styles.eventContent}>
        <span style={styles.eventTitle}>{event.title}</span>
        <span style={{
          ...styles.statusBadge,
          background: getStatusColor(event.status)
        }}>
          {event.status}
        </span>
      </div>
    </div>
  );
});

const styles = {
  event: {
    padding: '4px 8px',
    marginBottom: '2px',
    background: '#f8f9fa',
    borderRadius: '4px',
    borderLeft: '3px solid #667eea',
    cursor: 'grab',
    fontSize: '0.75rem',
    transition: 'all 0.2s ease',
    userSelect: 'none'
  },
  eventContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '4px'
  },
  eventTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1
  },
  statusBadge: {
    fontSize: '0.6rem',
    padding: '1px 6px',
    borderRadius: '10px',
    color: 'white',
    textTransform: 'uppercase'
  }
};

export default OptimizedEvent;
import React, { memo, useState } from 'react';

const ControlPanel = memo(({ 
  isOptimized, 
  onToggleOptimization, 
  isCounting, 
  onToggleCounting,
  onAddEvent  // ← New prop for adding events
}) => {
  console.log('ControlPanel rendered');

  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Work',
    status: 'draft',
    description: ''
  });

  const categories = ['Work', 'Personal', 'Social', 'Marketing'];
  const statuses = ['draft', 'scheduled', 'published'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) {
      alert('Please enter a title');
      return;
    }
    onAddEvent(newEvent);
    setNewEvent({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Work',
      status: 'draft',
      description: ''
    });
    setShowForm(false);
  };

  return (
    <div className="control-panel" style={styles.container}>
      <h3 style={styles.title}>⚙️ Controls</h3>
      
      {/* Create Post Button */}
      <div style={styles.controlGroup}>
        <button 
          onClick={() => setShowForm(!showForm)} 
          style={styles.createBtn}
        >
          {showForm ? '❌ Cancel' : '📝 Create New Post'}
        </button>
      </div>

      {/* Create Post Form */}
      {showForm && (
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>Create New Event</h4>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <select
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                style={styles.select}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                value={newEvent.status}
                onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                style={styles.select}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Add description..."
                style={styles.textarea}
                rows="2"
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              ✅ Add Event
            </button>
          </form>
        </div>
      )}

      {/* Optimization Toggle */}
      <div style={styles.controlGroup}>
        <label style={styles.label}>
          <span style={styles.labelText}>🚀 Optimization</span>
          <div style={styles.toggleContainer}>
            <button
              onClick={() => onToggleOptimization(false)}
              style={{
                ...styles.toggleBtn,
                background: !isOptimized ? '#667eea' : '#e9ecef',
                color: !isOptimized ? 'white' : '#333'
              }}
            >
              Off
            </button>
            <button
              onClick={() => onToggleOptimization(true)}
              style={{
                ...styles.toggleBtn,
                background: isOptimized ? '#667eea' : '#e9ecef',
                color: isOptimized ? 'white' : '#333'
              }}
            >
              On
            </button>
          </div>
        </label>
        <p style={styles.hint}>
          {isOptimized ? '✅ React.memo + useMemo + useCallback' : '❌ No optimization'}
        </p>
      </div>

      {/* Render Counter Toggle */}
      <div style={styles.controlGroup}>
        <label style={styles.label}>
          <span style={styles.labelText}>📊 Render Counter</span>
          <div style={styles.toggleContainer}>
            <button
              onClick={() => onToggleCounting(false)}
              style={{
                ...styles.toggleBtn,
                background: !isCounting ? '#28a745' : '#e9ecef',
                color: !isCounting ? 'white' : '#333'
              }}
            >
              Pause
            </button>
            <button
              onClick={() => onToggleCounting(true)}
              style={{
                ...styles.toggleBtn,
                background: isCounting ? '#28a745' : '#e9ecef',
                color: isCounting ? 'white' : '#333'
              }}
            >
              Count
            </button>
          </div>
        </label>
        <p style={styles.hint}>
          {isCounting ? '📈 Counting renders' : '⏸️ Paused'}
        </p>
      </div>

      <div style={styles.info}>
        <p>💡 Toggle optimization to see difference in render counts</p>
        <p>🔄 Drag events to reorder</p>
        <p>📝 Click "Create New Post" to add events</p>
      </div>
    </div>
  );
});

const styles = {
  container: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  title: {
    marginBottom: '1.5rem',
    color: '#333',
    fontSize: '1.1rem'
  },
  controlGroup: {
    marginBottom: '1.5rem'
  },
  createBtn: {
    width: '100%',
    padding: '0.8rem',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  formContainer: {
    background: '#f8f9fa',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    border: '1px solid #e9ecef'
  },
  formTitle: {
    marginBottom: '1rem',
    color: '#333'
  },
  formGroup: {
    marginBottom: '0.8rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.3rem',
    fontWeight: '500',
    color: '#555',
    fontSize: '0.9rem'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '2px solid #ddd',
    fontSize: '0.9rem'
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '2px solid #ddd',
    fontSize: '0.9rem',
    background: 'white'
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '2px solid #ddd',
    fontSize: '0.9rem',
    resize: 'vertical'
  },
  submitBtn: {
    width: '100%',
    padding: '0.6rem',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  toggleContainer: {
    display: 'flex',
    gap: '0',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '2px solid #ddd'
  },
  toggleBtn: {
    flex: 1,
    padding: '0.5rem 1rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  },
  hint: {
    marginTop: '0.3rem',
    fontSize: '0.85rem',
    color: '#888'
  },
  info: {
    marginTop: '1rem',
    padding: '0.75rem',
    background: '#f8f9fa',
    borderRadius: '6px',
    fontSize: '0.85rem',
    color: '#666'
  }
};

export default ControlPanel;
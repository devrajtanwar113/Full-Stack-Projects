import React from 'react';
import { useSelector } from 'react-redux';

function EditorPanel() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>✏️ Editor Panel</h1>
        <p style={styles.subtitle}>Welcome, {user?.name}! You can create and edit content.</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>📝 Create Post</h3>
          <p>Write new blog posts</p>
          <button style={styles.editorBtn}>New Post</button>
        </div>
        <div style={styles.card}>
          <h3>📄 Edit Posts</h3>
          <p>Edit existing content</p>
          <button style={styles.editorBtn}>Edit Posts</button>
        </div>
        <div style={styles.card}>
          <h3>📊 Content Dashboard</h3>
          <p>View your content stats</p>
          <button style={styles.editorBtn}>View Stats</button>
        </div>
      </div>

      <div style={styles.permissions}>
        <h3>🔑 Your Permissions</h3>
        <ul style={styles.permissionList}>
          <li>✅ Create Posts</li>
          <li>✅ Edit Posts</li>
          <li>✅ View Analytics</li>
          <li>❌ Delete Posts</li>
          <li>❌ Manage Users</li>
          <li>❌ System Settings</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '30px'
  },
  subtitle: {
    color: '#666',
    fontSize: '18px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  editorBtn: {
    marginTop: '10px',
    padding: '8px 16px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  permissions: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e9ecef'
  },
  permissionList: {
    listStyle: 'none',
    padding: '0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px'
  }
};

export default EditorPanel;
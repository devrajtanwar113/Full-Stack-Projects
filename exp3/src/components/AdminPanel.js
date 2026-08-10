import React from 'react';
import { useSelector } from 'react-redux';

function AdminPanel() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>👑 Admin Panel</h1>
        <p style={styles.subtitle}>Welcome, {user?.name}! You have full access.</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>👥 User Management</h3>
          <p>View, edit, and delete users</p>
          <button style={styles.adminBtn}>Manage Users</button>
        </div>
        <div style={styles.card}>
          <h3>📊 Analytics</h3>
          <p>View system analytics and reports</p>
          <button style={styles.adminBtn}>View Analytics</button>
        </div>
        <div style={styles.card}>
          <h3>⚙️ Settings</h3>
          <p>Configure system settings</p>
          <button style={styles.adminBtn}>Open Settings</button>
        </div>
        <div style={styles.card}>
          <h3>📝 Content Moderation</h3>
          <p>Moderate all content</p>
          <button style={styles.adminBtn}>Moderate</button>
        </div>
      </div>

      <div style={styles.permissions}>
        <h3>🔑 Your Permissions</h3>
        <ul style={styles.permissionList}>
          <li>✅ Manage Users</li>
          <li>✅ View Analytics</li>
          <li>✅ System Settings</li>
          <li>✅ Moderate Content</li>
          <li>✅ Delete Posts</li>
          <li>✅ Edit All Content</li>
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
  adminBtn: {
    marginTop: '10px',
    padding: '8px 16px',
    background: '#667eea',
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

export default AdminPanel;
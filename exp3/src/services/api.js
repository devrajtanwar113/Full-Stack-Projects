import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const users = [
  { id: 1, name: 'Admin User', email: 'admin@test.com', password: 'password123', role: 'admin' },
  { id: 2, name: 'Editor User', email: 'editor@test.com', password: 'password123', role: 'editor' },
  { id: 3, name: 'Viewer User', email: 'viewer@test.com', password: 'password123', role: 'viewer' }
];

const generateMockToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ 
    id: user.id, name: user.name, email: user.email, role: user.role,
    exp: Date.now() + 3600000 
  }));
  const signature = btoa('mock-signature');
  return `${header}.${body}.${signature}`;
};

export const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch (error) {
    return null;
  }
};

export const mockLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        const token = generateMockToken(user);
        resolve({ 
          token, 
          user: { id: user.id, name: user.name, email: user.email, role: user.role } 
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

export const mockRegister = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        reject(new Error('User already exists'));
      } else {
        const newUser = { id: users.length + 1, name, email, password, role: 'viewer' };
        users.push(newUser);
        const token = generateMockToken(newUser);
        resolve({ 
          token, 
          user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } 
        });
      }
    }, 500);
  });
};

export const fetchPosts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { id: 1, title: 'Public Post', content: 'Everyone can see this', author: 'Admin' },
          { id: 2, title: 'Admin Post', content: 'Only admins can edit this', author: 'Admin' },
          { id: 3, title: 'Editor Post', content: 'Editors can manage this', author: 'Editor' }
        ]
      });
    }, 500);
  });
};

export default api;
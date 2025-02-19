const BASE_URL = 'http://192.168.2.183:3000/api';

export const api = {
  jobs: {
    getAll: async (page = 1, limit = 20) => {
      const response = await fetch(`${BASE_URL}/jobs?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return response.json();
    },
    
    search: async (query, page = 1, limit = 20) => {
      const response = await fetch(`${BASE_URL}/jobs/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to search jobs');
      return response.json();
    }
  },

  auth: {
    register: async (userData) => {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Registration failed');
      return response.json();
    },

    login: async (credentials) => {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }
      return response.json();
    },

    getProfile: async (token) => {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    }
  }
};
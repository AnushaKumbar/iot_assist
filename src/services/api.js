// IoT Assist – API configuration
// This is the single place to configure backend endpoints.
// Set VITE_API_BASE_URL in your .env file when the real backend is ready.

const API_BASE = import.meta.env.VITE_API_BASE_URL || null;

export const USE_MOCK = !API_BASE;

export const endpoints = {
  chat: '/api/chat',           // POST { device, message, history }
  devices: '/api/devices',     // GET
  history: '/api/history',     // GET  | POST | DELETE
  knowledge: '/api/knowledge', // GET
  ragQuery: '/api/rag/query',  // POST { query }
  upload: '/api/documents/upload', // POST multipart/form-data
};

/**
 * Thin fetch wrapper. Add auth headers here when authentication is implemented.
 */
export async function apiRequest(path, options = {}) {
  if (!API_BASE) {
    throw new Error('API_BASE not configured – using mock services');
  }
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${getAuthToken()}`,
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}

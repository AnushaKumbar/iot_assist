// IoT Assist – Chatbot Service
// Handles all chatbot interactions.
// To connect to the real IBM Granite + RAG backend:
//   1. Set VITE_API_BASE_URL in .env
//   2. The USE_MOCK check below will automatically switch to real API calls.

import { USE_MOCK, apiRequest, endpoints } from './api.js';
import { getMockResponse } from '../data/mockResponses.js';

/**
 * Send a message to the troubleshooting chatbot.
 *
 * @param {string} device - Device name (e.g. "Smart Camera")
 * @param {string} message - User's problem description
 * @param {Array}  history - Previous messages in the conversation
 * @param {number} turnIndex - Number of AI turns already completed
 * @returns {Promise<Object>} AI response object
 */
export async function sendMessage({ device, message, history = [], turnIndex = 0 }) {
  if (USE_MOCK) {
    // Simulate network latency for realistic UX
    await delay(1400 + Math.random() * 800);
    return getMockResponse(device, message, turnIndex);
  }

  // Real IBM Granite / RAG backend call
  return apiRequest(endpoints.chat, {
    method: 'POST',
    body: JSON.stringify({ device, message, history, turnIndex }),
  });
}

/**
 * Fetch chat history from backend or localStorage.
 */
export function getLocalHistory() {
  try {
    return JSON.parse(localStorage.getItem('iot_history') || '[]');
  } catch {
    return [];
  }
}

/**
 * Persist a completed troubleshooting session to localStorage.
 */
export function saveSession(session) {
  try {
    const history = getLocalHistory();
    history.unshift(session);
    // Keep last 50 sessions
    localStorage.setItem('iot_history', JSON.stringify(history.slice(0, 50)));
  } catch {
    // localStorage quota exceeded – silently ignore
  }
}

export function clearHistory() {
  localStorage.removeItem('iot_history');
}

// ---------------------------------------------------------------------------
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

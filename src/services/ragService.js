// IoT Assist – RAG Service
// Handles document retrieval and knowledge-base queries.
// Plug in the real vector database / RAG pipeline by setting VITE_API_BASE_URL.

import { USE_MOCK, apiRequest, endpoints } from './api.js';
import { knowledgeArticles } from '../data/knowledgeBase.js';

/**
 * Query the RAG pipeline for relevant documents.
 *
 * @param {string} query - Search query
 * @returns {Promise<Array>} Ranked list of knowledge articles
 */
export async function queryKnowledge(query) {
  if (USE_MOCK) {
    await delay(600);
    const q = query.toLowerCase();
    return knowledgeArticles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.device.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }

  return apiRequest(endpoints.ragQuery, {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
}

/**
 * Upload a knowledge document to the RAG pipeline.
 * Frontend triggers this; actual ingestion happens on the backend.
 *
 * @param {File} file
 * @param {Object} metadata
 */
export async function uploadDocument(file, metadata = {}) {
  if (USE_MOCK) {
    await delay(1200);
    return { success: true, message: 'Document queued for processing (mock mode).' };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('metadata', JSON.stringify(metadata));

  return apiRequest(endpoints.upload, {
    method: 'POST',
    headers: {}, // Let browser set multipart boundary
    body: formData,
  });
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

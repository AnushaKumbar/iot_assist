import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { knowledgeArticles, KB_CATEGORIES } from '../data/knowledgeBase';
import { uploadDocument } from '../services/ragService';
import './KnowledgeBase.css';

export default function KnowledgeBase() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [uploadTitle, setUploadTitle] = useState('');

  const filtered = knowledgeArticles.filter((a) => {
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.device.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || a.category === category;
    return matchSearch && matchCat;
  });

  const handleUpload = async () => {
    if (!uploadFile) return;
    setUploadStatus('loading');
    try {
      await uploadDocument(uploadFile, { title: uploadTitle || uploadFile.name, category });
      setUploadStatus('success');
      setUploadFile(null);
      setUploadTitle('');
    } catch {
      setUploadStatus('error');
    }
  };

  return (
    <DashboardLayout>
      <h1 className="section-title">IoT Knowledge Base</h1>
      <p className="section-subtitle">Search troubleshooting guides, manuals, and FAQs used by the RAG pipeline.</p>

      {/* Search */}
      <div className="kb-search-row">
        <div className="kb-search-input-wrap">
          <span className="kb-search-icon">🔍</span>
          <input
            className="input-field kb-search-input"
            type="text"
            placeholder="Search troubleshooting guides, manuals, and FAQs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="category-filter">
        {KB_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`tag ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article grid */}
      <div className="kb-grid">
        {filtered.map((article) => (
          <div key={article.id} className="kb-card">
            <div className="kb-card-header">
              <span className="badge badge-blue">{article.category}</span>
              <span className="kb-card-pages">{article.pages} pages</span>
            </div>
            <h3 className="kb-card-title">{article.title}</h3>
            <p className="kb-card-device">📱 {article.device}</p>
            <p className="kb-card-desc">{article.description}</p>
            <blockquote className="kb-card-excerpt">"{article.excerpt}"</blockquote>
            <div className="kb-card-footer">
              <span className="kb-card-updated">Updated {article.updated}</span>
              <button className="btn btn-ghost btn-sm">View</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="kb-empty">No articles match your search.</div>
        )}
      </div>

      {/* Upload section */}
      <div className="card kb-upload-section">
        <div className="kb-upload-header">
          <div>
            <h2 className="kb-upload-title">Upload Knowledge Document</h2>
            <p className="kb-upload-desc">
              Add new documents to the RAG knowledge base. Supported formats: PDF, DOCX, TXT.
              Documents are processed and indexed for AI retrieval.
            </p>
          </div>
        </div>
        <div className="kb-upload-form">
          <input
            className="input-field"
            type="text"
            placeholder="Document title (optional)"
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
          />
          <label className="kb-file-label">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              style={{ display: 'none' }}
              onChange={(e) => setUploadFile(e.target.files[0] || null)}
            />
            <div className="kb-file-drop">
              {uploadFile ? (
                <div className="kb-file-selected">
                  <span>📄</span>
                  <span>{uploadFile.name}</span>
                  <span className="kb-file-size">({(uploadFile.size / 1024).toFixed(1)} KB)</span>
                </div>
              ) : (
                <>
                  <span className="kb-file-drop-icon">📤</span>
                  <span>Click to select a PDF, DOCX, or TXT file</span>
                  <span className="kb-file-hint">or drag and drop here</span>
                </>
              )}
            </div>
          </label>
          {uploadStatus === 'success' && (
            <div className="kb-upload-status kb-upload-success">
              ✅ Document queued for processing. The RAG pipeline will index it shortly.
            </div>
          )}
          {uploadStatus === 'error' && (
            <div className="kb-upload-status kb-upload-error">
              ❌ Upload failed. Please try again.
            </div>
          )}
          <div className="kb-upload-actions">
            <button
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={!uploadFile || uploadStatus === 'loading'}
            >
              {uploadStatus === 'loading' ? 'Uploading…' : '📤 Upload to Knowledge Base'}
            </button>
            {uploadFile && (
              <button
                className="btn btn-ghost"
                onClick={() => { setUploadFile(null); setUploadStatus(null); }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

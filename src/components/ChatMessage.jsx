import './ChatMessage.css';

export function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg--ai">
      <div className="chat-avatar chat-avatar--ai">⚡</div>
      <div className="chat-bubble chat-bubble--ai">
        <div className="typing-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

export default function ChatMessage({ message }) {
  const isAI = message.role === 'assistant';

  if (message.type === 'diagnosis') {
    return <DiagnosisMessage message={message} />;
  }

  return (
    <div className={`chat-msg ${isAI ? 'chat-msg--ai' : 'chat-msg--user'}`}>
      {isAI && <div className="chat-avatar chat-avatar--ai">⚡</div>}
      <div className={`chat-bubble ${isAI ? 'chat-bubble--ai' : 'chat-bubble--user'}`}>
        <p className="chat-text">{message.content}</p>
        <span className="chat-time">{formatTime(message.timestamp)}</span>
      </div>
      {!isAI && <div className="chat-avatar chat-avatar--user">👤</div>}
    </div>
  );
}

function DiagnosisMessage({ message }) {
  const { data } = message;

  return (
    <div className="chat-msg chat-msg--ai">
      <div className="chat-avatar chat-avatar--ai">⚡</div>
      <div className="diagnosis-card">
        {/* AI Diagnosis */}
        <div className="diag-section diag-section--blue">
          <div className="diag-section-header">
            <span className="diag-icon">🧠</span>
            <span className="diag-label">AI Diagnosis</span>
          </div>
          <p className="diag-text">{data.diagnosis}</p>
          <div className="diag-issue-badge">
            <span className="diag-issue-label">Possible Issue:</span>
            <span className="diag-issue-value">{data.possibleIssue}</span>
          </div>
        </div>

        {/* Likely Causes */}
        <div className="diag-section">
          <div className="diag-section-header">
            <span className="diag-icon">🔍</span>
            <span className="diag-label">Likely Causes</span>
          </div>
          <ul className="diag-list">
            {data.causes.map((cause, i) => (
              <li key={i}>{cause}</li>
            ))}
          </ul>
        </div>

        {/* Troubleshooting Steps */}
        <div className="diag-section diag-section--green">
          <div className="diag-section-header">
            <span className="diag-icon">🛠️</span>
            <span className="diag-label">Recommended Steps</span>
          </div>
          <ol className="diag-steps">
            {data.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Safety Note */}
        {data.safetyNote && (
          <div className="diag-section diag-section--yellow">
            <div className="diag-section-header">
              <span className="diag-icon">⚠️</span>
              <span className="diag-label">Important Note</span>
            </div>
            <p className="diag-text">{data.safetyNote}</p>
          </div>
        )}

        {/* Knowledge Sources */}
        {data.sources && data.sources.length > 0 && (
          <div className="diag-section diag-section--purple">
            <div className="diag-section-header">
              <span className="diag-icon">📚</span>
              <span className="diag-label">Knowledge Sources</span>
              <span className="badge badge-purple">{data.sources.length} documents retrieved</span>
            </div>
            <div className="source-cards">
              {data.sources.map((src, i) => (
                <div key={i} className="source-card">
                  <div className="source-card-top">
                    <span className="source-title">{src.title}</span>
                    <span className="source-relevance">{src.relevance}% match</span>
                  </div>
                  <p className="source-excerpt">"{src.excerpt}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <span className="chat-time" style={{ marginTop: 8, display: 'block' }}>{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}

function formatTime(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

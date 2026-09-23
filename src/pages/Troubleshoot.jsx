import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ChatMessage, { TypingIndicator } from '../components/ChatMessage';
import { devices, getDeviceById } from '../data/devices';
import { DEFAULT_SUGGESTIONS, SUGGESTED_PROBLEMS } from '../data/mockResponses';
import { sendMessage, saveSession } from '../services/chatbotService';
import './Troubleshoot.css';

function buildInitialMessage(deviceName) {
  return {
    id: Date.now(),
    role: 'assistant',
    type: 'text',
    content: `Hello! I'm IoT Assist. I can help diagnose problems with your **${deviceName}**. Please describe the issue you're experiencing, or select one of the common problems below.`,
    timestamp: new Date().toISOString(),
  };
}

export default function Troubleshoot() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Determine device from URL params
  const deviceId = searchParams.get('device');
  const deviceNameParam = searchParams.get('deviceName');
  const deviceFromId = deviceId ? getDeviceById(deviceId) : null;
  const deviceName = deviceFromId?.name || deviceNameParam || null;
  const deviceIcon = deviceFromId?.icon || '📱';

  // Stage: 'select' | 'chat'
  const [stage, setStage] = useState(deviceName ? 'chat' : 'select');
  const [selectedDevice, setSelectedDevice] = useState(deviceName || '');
  const [selectedDeviceIcon, setSelectedDeviceIcon] = useState(deviceIcon);
  const [messages, setMessages] = useState(() =>
    deviceName ? [buildInitialMessage(deviceName)] : []
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [turnIndex, setTurnIndex] = useState(0);
  const [sessionResolved, setSessionResolved] = useState(false);
  const [lastDiagnosis, setLastDiagnosis] = useState(null);
  const [error, setError] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions =
    SUGGESTED_PROBLEMS[deviceId] || DEFAULT_SUGGESTIONS;

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device.name);
    setSelectedDeviceIcon(device.icon);
    setMessages([buildInitialMessage(device.name)]);
    setStage('chat');
  };

  const handleSend = async (text) => {
    const msgText = (text || input).trim();
    if (!msgText || isLoading || sessionResolved) return;
    setInput('');
    setError(null);

    const userMsg = {
      id: Date.now(),
      role: 'user',
      type: 'text',
      content: msgText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendMessage({
        device: selectedDevice,
        message: msgText,
        history: messages,
        turnIndex,
      });

      const diagMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        type: 'diagnosis',
        data: response,
        timestamp: new Date().toISOString(),
      };

      const followUpMsg = {
        id: Date.now() + 2,
        role: 'assistant',
        type: 'text',
        content: response.followUp,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, diagMsg, followUpMsg]);
      setLastDiagnosis(response);
      setTurnIndex((t) => t + 1);
    } catch (err) {
      setError('Failed to get AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolved = (resolved) => {
    if (resolved) {
      setSessionResolved(true);
      const successMsg = {
        id: Date.now(),
        role: 'assistant',
        type: 'text',
        content: `Great! I'm glad the issue with your ${selectedDevice} has been resolved. Your session has been saved to Troubleshooting History. Feel free to start a new session if you encounter other issues!`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, successMsg]);

      // Save session to localStorage
      saveSession({
        device: selectedDevice,
        deviceIcon: selectedDeviceIcon,
        problem: messages.find((m) => m.role === 'user')?.content || 'Unknown issue',
        diagnosis: lastDiagnosis?.possibleIssue || 'General troubleshooting',
        status: 'Solved',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        timestamp: new Date().toISOString(),
      });
    } else {
      const continueMsg = {
        id: Date.now(),
        role: 'assistant',
        type: 'text',
        content: `No problem — let's continue diagnosing. Can you tell me: have you already restarted your ${selectedDevice} and your router? Also, is the device indicator light on, and if so, what color is it?`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, continueMsg]);
    }
  };

  const handleClear = () => {
    setShowClearConfirm(false);
    setMessages(selectedDevice ? [buildInitialMessage(selectedDevice)] : []);
    setTurnIndex(0);
    setSessionResolved(false);
    setLastDiagnosis(null);
    setError(null);
  };

  const lastMsg = messages[messages.length - 1];
  const showResolvedButtons =
    !sessionResolved &&
    !isLoading &&
    lastMsg?.role === 'assistant' &&
    lastMsg?.type === 'text' &&
    turnIndex > 0 &&
    lastMsg?.content?.includes('?');

  // ---- Device selection stage ----
  if (stage === 'select') {
    return (
      <DashboardLayout>
        <h1 className="section-title">Start Troubleshooting</h1>
        <p className="section-subtitle">Select your device to begin an AI-powered diagnostic session.</p>
        <div className="devices-grid" style={{ marginBottom: 32 }}>
          {devices.map((device) => (
            <div
              key={device.id}
              className="device-select-card"
              onClick={() => handleDeviceSelect(device)}
            >
              <div className="device-select-icon">{device.icon}</div>
              <div className="device-select-name">{device.name}</div>
              <div className="device-select-desc">{device.description}</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>Select</button>
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  // ---- Chat stage ----
  return (
    <DashboardLayout>
      <div className="chat-page">
        {/* Chat header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <button className="btn btn-ghost btn-sm" onClick={() => setStage('select')}>
              ← Back
            </button>
            <div className="chat-device-info">
              <span className="chat-device-icon">{selectedDeviceIcon}</span>
              <div>
                <div className="chat-page-title">IoT Troubleshooting Assistant</div>
                <div className="chat-device-name">Device: {selectedDevice}</div>
              </div>
            </div>
          </div>
          <div className="chat-header-actions">
            {sessionResolved && (
              <span className="badge badge-green">✅ Resolved</span>
            )}
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setShowClearConfirm(true)}
              title="Clear conversation"
            >
              🗑 Clear
            </button>
          </div>
        </div>

        {/* Confirm clear dialog */}
        {showClearConfirm && (
          <div className="confirm-banner">
            <span>Clear this conversation? This cannot be undone.</span>
            <div className="confirm-actions">
              <button className="btn btn-danger btn-sm" onClick={handleClear}>Yes, Clear</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowClearConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Chat messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          {error && (
            <div className="chat-error">
              ⚠️ {error}
              <button className="btn btn-ghost btn-sm" onClick={() => setError(null)}>Dismiss</button>
            </div>
          )}

          {/* Resolved / Continue buttons */}
          {showResolvedButtons && (
            <div className="resolved-buttons">
              <button className="btn btn-success" onClick={() => handleResolved(true)}>
                ✅ Yes, Problem Solved
              </button>
              <button className="btn btn-secondary" onClick={() => handleResolved(false)}>
                🔄 No, Continue Troubleshooting
              </button>
            </div>
          )}

          {/* Session resolved — new session CTA */}
          {sessionResolved && (
            <div className="session-resolved-cta">
              <button className="btn btn-primary" onClick={() => navigate('/troubleshoot')}>
                Start New Session
              </button>
              <button className="btn btn-ghost" onClick={() => navigate('/history')}>
                View History
              </button>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && !sessionResolved && (
          <div className="suggestions-bar">
            <span className="suggestions-label">Common issues:</span>
            <div className="suggestions-list">
              {suggestions.map((s) => (
                <button key={s} className="suggestion-chip" onClick={() => handleSend(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="chat-input-area">
          <div className="chat-input-row">
            <button className="chat-input-icon-btn" title="Attach file (coming soon)" disabled>
              📎
            </button>
            <textarea
              className="chat-textarea"
              rows={1}
              placeholder={sessionResolved ? 'Session resolved. Start a new session to continue.' : 'Describe your problem…'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading || sessionResolved}
            />
            <button className="chat-input-icon-btn" title="Voice input (coming soon)" disabled>
              🎤
            </button>
            <button
              className="btn btn-primary chat-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading || sessionResolved}
            >
              Send ↑
            </button>
          </div>
          <div className="chat-input-hint">Press Enter to send · Shift+Enter for new line</div>
        </div>
      </div>
    </DashboardLayout>
  );
}

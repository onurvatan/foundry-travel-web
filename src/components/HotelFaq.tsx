import { useState } from 'react';
import { askHotelFaq } from '../api/hotels';

interface Props {
  hotelId: string;
}

export function HotelFaq({ hotelId }: Props) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);

    try {
      const res = await askHotelFaq(hotelId, question);
      setAnswer(res);
    } catch (err) {
      setAnswer('Something went wrong while asking the AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      ask();
    }
  };

  return (
    <div>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#1e293b',
          marginBottom: '1rem',
        }}
      >
        Ask AI About This Hotel
      </h2>

      {/* Input Section */}
      <div style={{ marginBottom: '1rem' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#475569',
            fontWeight: 500,
          }}
        >
          Your Question
        </label>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., What amenities does this hotel have?"
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: 8,
            border: '2px solid #e2e8f0',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
        />
      </div>

      {/* Ask Button */}
      <button
        onClick={ask}
        disabled={loading || !question.trim()}
        style={{
          width: '100%',
          padding: '0.875rem',
          background: loading || !question.trim() ? '#cbd5e1' : '#2563eb',
          color: 'white',
          borderRadius: 8,
          border: 'none',
          cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          fontWeight: 600,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!loading && question.trim()) {
            e.currentTarget.style.background = '#1d4ed8';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && question.trim()) {
            e.currentTarget.style.background = '#2563eb';
          }
        }}
      >
        {loading ? (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                animation: 'spin 1s linear infinite',
              }}
            >
              ⏳
            </span>
            Thinking...
          </span>
        ) : (
          '💬 Ask AI'
        )}
      </button>

      {/* Answer Section */}
      {answer && (
        <div
          style={{
            marginTop: '1.5rem',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            padding: '1.25rem',
            borderRadius: 12,
            border: '1px solid #bae6fd',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>🤖</span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 600,
                  color: '#0c4a6e',
                  marginBottom: '0.5rem',
                }}
              >
                AI Answer:
              </div>
              <div
                style={{
                  color: '#0f172a',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {answer}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

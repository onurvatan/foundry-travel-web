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

  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: 8,
      }}
    >
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
        Ask about this hotel
      </h2>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something about this hotel..."
        style={{
          width: '100%',
          padding: '0.5rem',
          marginTop: '1rem',
          borderRadius: 6,
          border: '1px solid #ccc',
        }}
      />

      <button
        onClick={ask}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#2563eb',
          color: 'white',
          borderRadius: 6,
          cursor: 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {answer && (
        <div
          style={{
            marginTop: '1rem',
            background: '#f8fafc',
            padding: '1rem',
            borderRadius: 6,
            border: '1px solid #e2e8f0',
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

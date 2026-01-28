import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { aiRecommend } from '../api/hotels';

export default function Recommendation() {
  const [prefs, setPrefs] = useState('');

  const recommend = useMutation({
    mutationFn: () => aiRecommend(prefs),
  });

  return (
    <div>
      <h1>AI Recommendation</h1>

      <textarea
        value={prefs}
        onChange={(e) => setPrefs(e.target.value)}
        placeholder="Describe your preferences..."
        style={{ width: '100%', height: '120px', marginTop: '1rem' }}
      />

      <button
        onClick={() => recommend.mutate()}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Recommend
      </button>

      {recommend.data && (
        <pre style={{ marginTop: '1rem' }}>
          {JSON.stringify(recommend.data, null, 2)}
        </pre>
      )}
    </div>
  );
}

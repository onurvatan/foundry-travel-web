import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { aiRecommend } from '../api/hotels';

export default function Recommendation() {
  const [prefs, setPrefs] = useState('');

  const recommend = useMutation({
    mutationFn: () => aiRecommend(prefs),
  });

  return (
    <div className="page-container">
      <div className="recommendation-section">
        <h1 className="page-title">AI-Powered Recommendations</h1>
        <p className="page-subtitle">
          Tell us about your travel preferences and let AI find the perfect
          hotel for you
        </p>

        <div className="preference-box">
          <textarea
            value={prefs}
            onChange={(e) => setPrefs(e.target.value)}
            placeholder="Describe your preferences... e.g., I want a romantic getaway in a quiet location with spa facilities and ocean views. Budget is flexible."
            className="preference-input"
          />
          <button
            onClick={() => recommend.mutate()}
            className="recommend-button"
            disabled={!prefs.trim() || recommend.isPending}
          >
            {recommend.isPending ? '🤔 Thinking...' : '✨ Get Recommendations'}
          </button>
        </div>

        {recommend.data && (
          <div className="recommendation-results">
            <h3>AI Recommendations:</h3>
            <pre className="result-pre">
              {JSON.stringify(recommend.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

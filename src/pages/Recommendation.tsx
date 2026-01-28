import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { aiRecommend, getHotel } from '../api/hotels';
import { HotelCard } from '../components/HotelCard';

export default function Recommendation() {
  const [prefs, setPrefs] = useState('');
  const [hotelId, setHotelId] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');

  const recommend = useMutation({
    mutationFn: () => aiRecommend(prefs),
    onSuccess: (data) => {
      // Handle the AI response which contains hotelId and reason
      if (data?.hotelId) {
        setHotelId(data.hotelId);
        setReason(data.reason || '');
      }
    },
  });

  // Fetch the actual hotel data when we have a hotelId
  const { data: hotel, isLoading: isLoadingHotel } = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => getHotel(hotelId!),
    enabled: !!hotelId,
  });

  // Reset hotel when starting a new recommendation
  useEffect(() => {
    if (recommend.isPending) {
      setHotelId(null);
      setReason('');
    }
  }, [recommend.isPending]);

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

        {(hotel || isLoadingHotel) && (
          <div className="recommendation-results">
            {isLoadingHotel ? (
              <div className="loading-state">
                <p>Loading hotel details...</p>
              </div>
            ) : hotel ? (
              <>
                <h3 className="results-title">We Recommend:</h3>
                {reason && (
                  <div className="recommendation-reason">
                    <strong>Why this hotel?</strong>
                    <p>{reason}</p>
                  </div>
                )}
                <div className="hotels-grid">
                  <HotelCard hotel={hotel} />
                </div>
              </>
            ) : null}
          </div>
        )}

        {recommend.isError && (
          <div className="error-state">
            <p>Something went wrong. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { aiRecommend, getHotel, getHotels } from '../api/hotels';
import { HotelCard } from '../components/HotelCard';

export default function Home() {
  const [prefs, setPrefs] = useState('');
  const [hotelId, setHotelId] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');

  const recommend = useMutation({
    mutationFn: () => aiRecommend(prefs),
    onSuccess: (data) => {
      if (data?.hotelId) {
        setHotelId(data.hotelId);
        setReason(data.reason || '');
      }
    },
  });

  const { data: recommendedHotel, isLoading: isLoadingHotel } = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => getHotel(hotelId!),
    enabled: !!hotelId,
  });

  useEffect(() => {
    if (recommend.isPending) {
      setHotelId(null);
      setReason('');
    }
  }, [recommend.isPending]);

  const hotelsQuery = useQuery({
    queryKey: ['hotels'],
    queryFn: getHotels,
  });

  return (
    <div className="page-container">
      <div className="recommendation-section">
        <h1 className="page-title">AI-Powered Hotel Recommendations</h1>
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
            onKeyPress={(e) =>
              e.key === 'Enter' && !e.shiftKey && recommend.mutate()
            }
          />
          <button
            onClick={() => recommend.mutate()}
            className="recommend-button"
            disabled={!prefs.trim() || recommend.isPending}
          >
            {recommend.isPending ? '🤔 Thinking...' : '✨ Get Recommendations'}
          </button>
        </div>

        {(recommendedHotel || isLoadingHotel) && (
          <div className="recommendation-results">
            {isLoadingHotel ? (
              <div className="loading-state">
                <p>Loading hotel details...</p>
              </div>
            ) : recommendedHotel ? (
              <>
                <h3 className="results-title">We Recommend:</h3>
                {reason && (
                  <div className="recommendation-reason">
                    <strong>Why this hotel?</strong>
                    <p>{reason}</p>
                  </div>
                )}
                <div className="hotels-grid">
                  <HotelCard hotel={recommendedHotel} />
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

      <div className="hotels-section">
        <h2 className="section-title">All Available Hotels</h2>

        {hotelsQuery.isLoading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading hotels...</p>
          </div>
        )}

        <div className="hotels-grid">
          {hotelsQuery.data?.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}

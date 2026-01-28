import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { aiSearch, getHotels } from '../api/hotels';
import { HotelCard } from '../components/HotelCard';

export default function Home() {
  const [query, setQuery] = useState('');

  const search = useMutation({
    mutationFn: () => aiSearch(query),
  });

  const hotelsQuery = useQuery({
    queryKey: ['hotels'],
    queryFn: getHotels,
  });

  return (
    <div className="page-container">
      <div className="search-section">
        <h1 className="page-title">Find Your Perfect Stay</h1>
        <p className="page-subtitle">
          Use natural language to search for hotels that match your needs
        </p>

        <div className="search-box">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 4-star hotel in Paris under 200 EUR"
            className="search-input"
            onKeyPress={(e) => e.key === 'Enter' && search.mutate()}
          />
          <button
            onClick={() => search.mutate()}
            className="search-button"
            disabled={!query.trim() || search.isPending}
          >
            {search.isPending ? '🔄 Searching...' : '🔍 Search'}
          </button>
        </div>

        {search.data && (
          <div className="search-results">
            <h3>Search Results:</h3>
            <pre className="result-pre">
              {JSON.stringify(search.data, null, 2)}
            </pre>
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

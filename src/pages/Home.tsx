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
    <div>
      <h1>Natural Language Hotel Search</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. 4-star hotel in Paris under 200 EUR"
        style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}
      />

      <button
        onClick={() => search.mutate()}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Search
      </button>

      {search.data && (
        <pre style={{ marginTop: '1rem' }}>
          {JSON.stringify(search.data, null, 2)}
        </pre>
      )}

      <h2 style={{ marginTop: '2rem' }}>All Hotels</h2>

      {hotelsQuery.isLoading && <p>Loading hotels...</p>}

      {hotelsQuery.data?.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

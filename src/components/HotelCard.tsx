import { Link } from 'react-router-dom';
import type { Hotel } from '../types/Hotel';

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link
      to={`/hotels/${hotel.id}`}
      style={{
        display: 'block',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: 8,
        marginBottom: '1rem',
        background: '#177245',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: '1.2rem',
          fontWeight: 600,
        }}
      >
        {hotel.name}
      </h3>

      <p style={{ margin: '0.5rem 0' }}>{hotel.description}</p>

      <p style={{ margin: 0 }}>
        ⭐ {hotel.starRating} · {hotel.basePricePerNight} EUR / night
      </p>
    </Link>
  );
}

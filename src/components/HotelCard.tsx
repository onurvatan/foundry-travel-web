import { Link } from 'react-router-dom';
import type { Hotel } from '../types/Hotel';

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link to={`/hotels/${hotel.id}`} className="hotel-card">
      <div className="hotel-card-header">
        <h3 className="hotel-name">{hotel.name}</h3>
        <div className="hotel-rating">{'⭐'.repeat(hotel.starRating)}</div>
      </div>

      <p className="hotel-description">{hotel.description}</p>

      <div className="hotel-card-footer">
        <span className="hotel-price">
          <strong>{hotel.basePricePerNight} EUR</strong> / night
        </span>
        <span className="view-details">View Details →</span>
      </div>
    </Link>
  );
}

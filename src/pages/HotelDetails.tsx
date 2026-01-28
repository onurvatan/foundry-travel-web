import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getHotel } from '../api/hotels';
import { HotelFaq } from '../components/HotelFaq';
import { useState } from 'react';

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const hotelQuery = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getHotel(id!),
    enabled: !!id,
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the lead to your backend
    console.log('Booking lead submitted:', { ...bookingData, hotelId: id });
    setBookingSubmitted(true);
    setTimeout(() => {
      setShowBookingForm(false);
      setBookingSubmitted(false);
      setBookingData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '1',
      });
    }, 3000);
  };

  if (hotelQuery.isLoading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotelQuery.data) {
    return (
      <div className="page-container">
        <div className="error-state">
          <h2>Hotel not found</h2>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const hotel = hotelQuery.data;

  return (
    <div className="page-container">
      <div className="hotel-details-container">
        {/* Header Section */}
        <div className="hotel-header">
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Hotels
          </button>

          <div className="hotel-title-location-wrapper">
            <div className="hotel-title-section">
              <h1 className="hotel-name">{hotel.name}</h1>
              <div className="hotel-rating">
                {'⭐'.repeat(hotel.starRating)}
                <span className="rating-text">
                  {hotel.starRating}-Star Hotel
                </span>
              </div>
            </div>

            <div className="hotel-location">
              <span className="location-icon">📍</span>
              <span>{hotel.address}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="hotel-content-grid">
          {/* Left Column - Hotel Info */}
          <div className="hotel-info-column">
            <div className="info-card">
              <h2 className="section-title">About This Hotel</h2>
              <p className="hotel-description">{hotel.description}</p>
            </div>

            {/* FAQ Section */}
            <div className="info-card">
              <HotelFaq hotelId={id!} />
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="booking-column">
            <div className="booking-card">
              <div className="price-section">
                <div className="price-label">Starting from</div>
                <div className="price-amount">
                  ${hotel.basePricePerNight}
                  <span className="price-period">/night</span>
                </div>
                <div className="price-note">Best available rate</div>
              </div>

              <button
                onClick={() => setShowBookingForm(true)}
                className="book-now-button"
              >
                📅 Book Now
              </button>

              <div className="booking-benefits">
                <div className="benefit-item">✓ Free cancellation</div>
                <div className="benefit-item">✓ No prepayment needed</div>
                <div className="benefit-item">✓ Best price guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div
          className="modal-overlay"
          onClick={() => !bookingSubmitted && setShowBookingForm(false)}
        >
          <div
            className="modal-content booking-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {bookingSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Booking Request Received!</h2>
                <p>We'll contact you shortly to confirm your reservation.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Complete Your Booking</h2>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="close-button"
                  >
                    ✕
                  </button>
                </div>

                <div className="booking-summary">
                  <strong>{hotel.name}</strong>
                  <div className="summary-price">
                    ${hotel.basePricePerNight}/night
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="booking-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingData.name}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, name: e.target.value })
                      }
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          email: e.target.value,
                        })
                      }
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Check-in Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingData.checkIn}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            checkIn: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group">
                      <label>Check-out Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingData.checkOut}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            checkOut: e.target.value,
                          })
                        }
                        min={
                          bookingData.checkIn ||
                          new Date().toISOString().split('T')[0]
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Number of Guests *</label>
                    <select
                      required
                      value={bookingData.guests}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          guests: e.target.value,
                        })
                      }
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>

                  <button type="submit" className="submit-booking-button">
                    Submit Booking Request
                  </button>

                  <p className="form-note">
                    * We'll contact you to confirm availability and finalize
                    your reservation
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .hotel-details-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .hotel-header {
          margin-bottom: 2rem;
        }

        .back-button {
          background: transparent;
          border: 1px solid #e2e8f0;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          color: #475569;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          transition: all 0.2s;
        }

        .back-button:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .hotel-title-location-wrapper {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
          padding: 2rem;
          border-left: 4px solid #2563eb;
        }

        .hotel-title-section {
          margin-bottom: 1.25rem;
        }

        .hotel-name {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.75rem 0;
          line-height: 1.2;
        }

        .hotel-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.2rem;
        }

        .rating-text {
          font-size: 1rem;
          color: #475569;
          font-weight: 600;
        }

        .hotel-location {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #475569;
          font-size: 1.1rem;
          background: white;
          padding: 0.875rem 1.25rem;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .location-icon {
          font-size: 1.2rem;
        }

        .hotel-content-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
        }

        @media (max-width: 968px) {
          .hotel-content-grid {
            grid-template-columns: 1fr;
          }
        }

        .hotel-info-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 1rem 0;
        }

        .hotel-description {
          color: #475569;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .booking-column {
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        .booking-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          border: 2px solid #2563eb;
        }

        .price-section {
          text-align: center;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #f1f5f9;
          margin-bottom: 1.5rem;
        }

        .price-label {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .price-amount {
          font-size: 3rem;
          font-weight: 800;
          color: #2563eb;
          line-height: 1;
        }

        .price-period {
          font-size: 1.2rem;
          color: #64748b;
          font-weight: 500;
        }

        .price-note {
          color: #64748b;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .book-now-button {
          width: 100%;
          padding: 1rem;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 1.5rem;
        }

        .book-now-button:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }

        .booking-benefits {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .benefit-item {
          color: #16a34a;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.2s ease-out;
        }

        .booking-modal {
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #1e293b;
        }

        .close-button {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
          padding: 0.25rem;
          transition: color 0.2s;
        }

        .close-button:hover {
          color: #1e293b;
        }

        .booking-summary {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-price {
          color: #2563eb;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #475569;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group select {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #2563eb;
        }

        .submit-booking-button {
          padding: 1rem;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 0.5rem;
        }

        .submit-booking-button:hover {
          background: #1d4ed8;
        }

        .form-note {
          text-align: center;
          color: #64748b;
          font-size: 0.85rem;
          margin: 0;
        }

        .success-message {
          text-align: center;
          padding: 2rem;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: #16a34a;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          margin: 0 auto 1.5rem;
        }

        .success-message h2 {
          color: #16a34a;
          margin: 0 0 1rem 0;
        }

        .success-message p {
          color: #64748b;
          font-size: 1.05rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getHotel } from '../api/hotels';
import { HotelFaq } from '../components/HotelFaq';

export default function HotelDetails() {
  const { id } = useParams();

  const hotelQuery = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getHotel(id!),
    enabled: !!id,
  });

  if (hotelQuery.isLoading) return <p>Loading...</p>;
  if (!hotelQuery.data) return <p>Hotel not found.</p>;

  const hotel = hotelQuery.data;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>

      <HotelFaq hotelId={id!} />
    </div>
  );
}

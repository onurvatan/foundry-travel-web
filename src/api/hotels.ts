import type { Hotel } from '../types/Hotel';
import { api } from './client';

export const aiSearch = async (query: string) => {
  const res = await api.post('/ai/search', { query });
  return res.data;
};

export const aiRecommend = async (preferences: string) => {
  const res = await api.post('/ai/recommend', { preferences });
  return res.data;
};

export const askHotelFaq = async (hotelId: string, question: string) => {
  const res = await api.post(`/ai/hotel/${hotelId}/faq`, { question });
  return res.data;
};

export const getHotel = async (id: string): Promise<Hotel> => {
  const res = await api.get(`/hotels/${id}`);
  return res.data;
};

export const getHotels = async (): Promise<Hotel[]> => {
  const res = await api.get('/hotels/search');
  return res.data.items;
};

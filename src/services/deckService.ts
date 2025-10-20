import api from './api';
import type { Deck, CreateDeckRequest, UpdateDeckRequest } from '../types';

export const deckService = {
  // Get all decks for current user
  getDecks: async (): Promise<Deck[]> => {
    const response = await api.get<Deck[]>('/decks');
    return response.data;
  },

  // Get single deck by ID
  getDeck: async (id: string): Promise<Deck> => {
    const response = await api.get<Deck>(`/decks/${id}`);
    return response.data;
  },

  // Create new deck
  createDeck: async (data: CreateDeckRequest): Promise<Deck> => {
    const response = await api.post<Deck>('/decks', data);
    return response.data;
  },

  // Update deck
  updateDeck: async (id: string, data: UpdateDeckRequest): Promise<Deck> => {
    const response = await api.patch<Deck>(`/decks/${id}`, data);
    return response.data;
  },

  // Delete deck
  deleteDeck: async (id: string): Promise<void> => {
    await api.delete(`/decks/${id}`);
  },
};

import api from './api';
import type { Card, CreateCardRequest, UpdateCardRequest } from '../types';

export const cardService = {
  // Get all cards for a deck
  getCards: async (deckId: string): Promise<Card[]> => {
    const response = await api.get<Card[]>(`/decks/${deckId}/cards`);
    return response.data;
  },

  // Get single card
  getCard: async (deckId: string, cardId: string): Promise<Card> => {
    const response = await api.get<Card>(`/decks/${deckId}/cards/${cardId}`);
    return response.data;
  },

  // Create new card
  createCard: async (deckId: string, data: CreateCardRequest): Promise<Card> => {
    const response = await api.post<Card>(`/decks/${deckId}/cards`, data);
    return response.data;
  },

  // Update card
  updateCard: async (deckId: string, cardId: string, data: UpdateCardRequest): Promise<Card> => {
    const response = await api.patch<Card>(`/decks/${deckId}/cards/${cardId}`, data);
    return response.data;
  },

  // Delete card
  deleteCard: async (deckId: string, cardId: string): Promise<void> => {
    await api.delete(`/decks/${deckId}/cards/${cardId}`);
  },
};

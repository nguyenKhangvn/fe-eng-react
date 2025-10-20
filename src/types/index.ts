// TypeScript interfaces and types
export interface User {
  id: string;
  email: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  cardCount?: number;
}

export interface CreateDeckRequest {
  name: string;
  description?: string;
}

export interface UpdateDeckRequest {
  name?: string;
  description?: string;
}

export interface Card {
  id: string;
  front: string;
  back: string;
  deckId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardRequest {
  front: string;
  back: string;
}

export interface UpdateCardRequest {
  front?: string;
  back?: string;
}

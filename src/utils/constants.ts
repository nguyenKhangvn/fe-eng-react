// API constants
export const API_BASE_URL = 'http://localhost:3000/api';

// Storage keys
export const TOKEN_KEY = 'access_token';
export const USER_KEY = 'user';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DECKS: '/decks',
  DECK_DETAIL: '/decks/:deckId',
  PRACTICE: '/decks/:deckId/practice',
} as const;

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DecksPage } from './pages/DecksPage';
import { DeckDetailPage } from './pages/DeckDetailPage';
import { PracticePage } from './pages/PracticePage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/decks" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/decks',
    element: (
      <ProtectedRoute>
        <DecksPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/decks/:deckId',
    element: (
      <ProtectedRoute>
        <DeckDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/decks/:deckId/practice',
    element: (
      <ProtectedRoute>
        <PracticePage />
      </ProtectedRoute>
    ),
  },
]);

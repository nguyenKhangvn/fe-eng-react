import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCards } from '../hooks/useCards';
import { useDeck } from '../hooks/useDecks';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';
import type { Card } from '../types';

export const PracticePage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { data: deck } = useDeck(deckId!);
  const { data: cards, isLoading } = useCards(deckId!);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);

  useEffect(() => {
    if (cards) {
      setShuffledCards([...cards]);
    }
  }, [cards]);

  const handleShuffle = () => {
    if (cards) {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (isLoading) return <Loading />;

  if (!shuffledCards || shuffledCards.length === 0) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No cards to practice.</p>
          <Link to={`/decks/${deckId}`}>
            <Button>Back to Deck</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const currentCard = shuffledCards[currentIndex];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link to={`/decks/${deckId}`} className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Deck
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Practice: {deck?.name}</h1>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Card {currentIndex + 1} of {shuffledCards.length}
            </span>
            <Button size="sm" variant="secondary" onClick={handleShuffle}>
              Shuffle
            </Button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / shuffledCards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="bg-white rounded-lg shadow-xl p-8 min-h-[300px] flex items-center justify-center cursor-pointer mb-6 transform transition-transform hover:scale-105"
          onClick={handleFlip}
        >
          <div className="text-center">
            {isFlipped ? (
              <>
                <p className="text-sm text-gray-500 mb-4">Answer:</p>
                <p className="text-2xl text-gray-900">{currentCard.back}</p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">Question:</p>
                <p className="text-2xl font-bold text-gray-900">{currentCard.front}</p>
              </>
            )}
            <p className="text-sm text-gray-400 mt-8">Click to flip</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="secondary"
          >
            ← Previous
          </Button>
          <Button onClick={handleFlip} variant="secondary">
            {isFlipped ? 'Show Question' : 'Show Answer'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === shuffledCards.length - 1}
          >
            Next →
          </Button>
        </div>

        {currentIndex === shuffledCards.length - 1 && (
          <div className="mt-8 text-center">
            <p className="text-green-600 font-semibold mb-4">🎉 You've reached the end!</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleShuffle}>Practice Again</Button>
              <Link to={`/decks/${deckId}`}>
                <Button variant="secondary">Back to Deck</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

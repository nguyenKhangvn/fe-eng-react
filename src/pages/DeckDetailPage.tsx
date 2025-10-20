import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDeck } from '../hooks/useDecks';
import { useCards, useCreateCard, useDeleteCard } from '../hooks/useCards';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Loading } from '../components/ui/Loading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const cardSchema = z.object({
  front: z.string().min(1, 'Front is required'),
  back: z.string().min(1, 'Back is required'),
});

type CardFormData = z.infer<typeof cardSchema>;

export const DeckDetailPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { data: deck, isLoading: deckLoading } = useDeck(deckId!);
  const { data: cards, isLoading: cardsLoading } = useCards(deckId!);
  const createCard = useCreateCard();
  const deleteCard = useDeleteCard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
  });

  const onSubmit = async (data: CardFormData) => {
    try {
      await createCard.mutateAsync({ deckId: deckId!, data });
      setIsModalOpen(false);
      reset();
    } catch (err) {
      console.error('Failed to create card:', err);
    }
  };

  const handleDelete = async (cardId: string) => {
    try {
      await deleteCard.mutateAsync({ deckId: deckId!, cardId });
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete card:', err);
    }
  };

  const toggleFlip = (cardId: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  if (deckLoading || cardsLoading) return <Loading />;

  return (
    <Layout>
      <div className="mb-8">
        <Link to="/decks" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Decks
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{deck?.name}</h1>
            <p className="text-gray-600 mt-2">{deck?.description}</p>
          </div>
          <div className="flex gap-2">
            {cards && cards.length > 0 && (
              <Link to={`/decks/${deckId}/practice`}>
                <Button>Practice</Button>
              </Link>
            )}
            <Button onClick={() => setIsModalOpen(true)}>Add Card</Button>
          </div>
        </div>
      </div>

      {cards && cards.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No cards yet. Add your first card!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards?.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div
                className="cursor-pointer min-h-[120px] flex items-center justify-center mb-4"
                onClick={() => toggleFlip(card.id)}
              >
                {flippedCards.has(card.id) ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Back:</p>
                    <p className="text-lg text-gray-900">{card.back}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Front:</p>
                    <p className="text-lg font-semibold text-gray-900">{card.front}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteConfirm(card.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Card Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Card"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('front')}
            label="Front (Question)"
            placeholder="e.g., Hello"
            error={errors.front?.message}
          />
          <Input
            {...register('back')}
            label="Back (Answer)"
            placeholder="e.g., Xin chào"
            error={errors.back?.message}
          />
          <div className="flex gap-2 justify-end mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={createCard.isPending}>
              Add Card
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title="Confirm Delete"
        >
          <p className="mb-4">Are you sure you want to delete this card?</p>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(deleteConfirm)}
              isLoading={deleteCard.isPending}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

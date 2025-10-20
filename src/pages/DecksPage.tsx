import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDecks, useCreateDeck, useDeleteDeck } from '../hooks/useDecks';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Loading } from '../components/ui/Loading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const deckSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

type DeckFormData = z.infer<typeof deckSchema>;

export const DecksPage: React.FC = () => {
  const { data: decks, isLoading, error } = useDecks();
  const createDeck = useCreateDeck();
  const deleteDeck = useDeleteDeck();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeckFormData>({
    resolver: zodResolver(deckSchema),
  });

  const onSubmit = async (data: DeckFormData) => {
    try {
      await createDeck.mutateAsync(data);
      setIsModalOpen(false);
      reset();
    } catch (err) {
      console.error('Failed to create deck:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDeck.mutateAsync(id);
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete deck:', err);
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Layout>
        <div className="text-center text-red-600">
          Error loading decks: {error.message}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Decks</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Create New Deck
        </Button>
      </div>

      {decks && decks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No decks yet. Create your first deck!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks?.map((deck) => (
            <div
              key={deck.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <Link to={`/decks/${deck.id}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {deck.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {deck.description || 'No description'}
                </p>
                <p className="text-sm text-gray-500">
                  {deck.cardCount || 0} cards
                </p>
              </Link>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteConfirm(deck.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Deck Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Deck"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('name')}
            label="Deck Name"
            placeholder="e.g., English Vocabulary"
            error={errors.name?.message}
          />
          <Input
            {...register('description')}
            label="Description (Optional)"
            placeholder="What is this deck about?"
            error={errors.description?.message}
          />
          <div className="flex gap-2 justify-end mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={createDeck.isPending}>
              Create
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
          <p className="mb-4">Are you sure you want to delete this deck? This action cannot be undone.</p>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(deleteConfirm)}
              isLoading={deleteDeck.isPending}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deckService } from '../services/deckService';
import type { CreateDeckRequest, UpdateDeckRequest } from '../types';

export const useDecks = () => {
  return useQuery({
    queryKey: ['decks'],
    queryFn: deckService.getDecks,
  });
};

export const useDeck = (id: string) => {
  return useQuery({
    queryKey: ['decks', id],
    queryFn: () => deckService.getDeck(id),
    enabled: !!id,
  });
};

export const useCreateDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDeckRequest) => deckService.createDeck(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] });
    },
  });
};

export const useUpdateDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDeckRequest }) =>
      deckService.updateDeck(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['decks'] });
      queryClient.invalidateQueries({ queryKey: ['decks', variables.id] });
    },
  });
};

export const useDeleteDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deckService.deleteDeck(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] });
    },
  });
};

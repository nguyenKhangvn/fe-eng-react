import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cardService } from '../services/cardService';
import type { CreateCardRequest, UpdateCardRequest } from '../types';

export const useCards = (deckId: string) => {
  return useQuery({
    queryKey: ['decks', deckId, 'cards'],
    queryFn: () => cardService.getCards(deckId),
    enabled: !!deckId,
  });
};

export const useCard = (deckId: string, cardId: string) => {
  return useQuery({
    queryKey: ['decks', deckId, 'cards', cardId],
    queryFn: () => cardService.getCard(deckId, cardId),
    enabled: !!deckId && !!cardId,
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deckId, data }: { deckId: string; data: CreateCardRequest }) =>
      cardService.createCard(deckId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['decks', variables.deckId, 'cards'] });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deckId, cardId, data }: { deckId: string; cardId: string; data: UpdateCardRequest }) =>
      cardService.updateCard(deckId, cardId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['decks', variables.deckId, 'cards'] });
      queryClient.invalidateQueries({ queryKey: ['decks', variables.deckId, 'cards', variables.cardId] });
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deckId, cardId }: { deckId: string; cardId: string }) =>
      cardService.deleteCard(deckId, cardId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['decks', variables.deckId, 'cards'] });
    },
  });
};

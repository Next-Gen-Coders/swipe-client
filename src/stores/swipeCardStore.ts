import { create } from "zustand";

interface Image {
  thumb: string;
  small: string;
  large: string;
}

interface SwipeCard {
  id: string;
  name: string;
  symbol: string;
  position_type: string;
  entry_price: number;
  stop_loss: number;
  take_profit: number;
  reasoning: string;
  base_contract: string;
  current_price: number;
  price_change_24h: number;
  image: Image;
  seen: boolean;
}

interface SwipeCardStore {
  cards: SwipeCard[];
  setCards: (cards: Omit<SwipeCard, "seen">[]) => void;
  markAsSeen: (cardId: string) => void;
}

export const useSwipeCardStore = create<SwipeCardStore>((set) => ({
  cards: [],
  setCards: (newCards) =>
    set(() => ({
      cards: newCards.map((card) => ({
        ...card,
        seen: false, // Initialize seen as false for each card
      })),
    })),
  markAsSeen: (cardId) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === cardId ? { ...card, seen: true } : card,
      ),
    })),
}));

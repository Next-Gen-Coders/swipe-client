/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useSwipeCardStore } from "@/stores/swipeCardStore";
import { useGetSwipeCards } from "@/hooks/apis/useGetSwipeCards";
import BarLoader from "../loader";
import { useSessionStore } from "@/stores/sessionStore";
import { SwipeCard } from "@/utils/Types";

interface CardProps {
  id: string;
  url: string;
  name: string;
  symbol: string;
  entry_price: number;
  take_profit: number;
  stop_loss: number;
  position_type: "long" | "short";
  setCards: (cards: SwipeCard[]) => void;
  cards: any;
  setIsDragging: (isDragging: boolean) => void;
  setShowMoreInfo: (showMoreInfo: boolean) => void;
  setDragSide: (dragSide: "left" | "right") => void;

  image: {
    large: string;
    small: string;
    thumb: string;
  };
  onCardView: (card: SwipeCard | null) => void;
}

const Card = ({
  id,
  url,
  name,
  symbol,
  entry_price,
  take_profit,
  stop_loss,
  position_type,
  setCards,
  cards,
  setIsDragging,
  setShowMoreInfo,
  setDragSide,
  onCardView,
}: CardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const isFront = id === cards[cards.length - 1].id;

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const rotate = useTransform(() => {
    const offset = isFront ? 1 : parseInt(id) % 2 ? 4 : -4;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(y.get()) > 70 && y.get() < 0) {
      setShowMoreInfo(true);
      onCardView(cards.find((c) => c.id === id) || null);
    }

    if (x.get() > 60 || x.get() < -60) {
      // Filter out the current card and maintain the array structure
      const newCards = cards.filter((card: any) => card.id !== id);
      setCards(newCards);
    }

    // Reset position
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`flex aspect-[7/8] w-[80%] origin-bottom flex-col overflow-hidden rounded-3xl border border-black/10 bg-white pb-3 shadow-black hover:cursor-grab active:cursor-grabbing md:w-[70%] ${isFront ? "rotate-0 shadow-xl" : "!opacity-50"
        }`}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        y,
        opacity,
        rotate,
        transition: "0.125s transform",
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? true : false}
      dragConstraints={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onDrag={(_e, info) => {
        // Convert x movement to degrees - assuming you have a function or value that does this
        const deg = info.offset.x;

        if (deg < 2) {
          setDragSide("left");
        } else {
          setDragSide("right");
        }
      }}
    >
      {/* Image Container - 60% height */}
      <div className="relative h-[60%] w-full">
        <img
          src={url}
          alt={`${name} image`}
          className="h-full w-full object-cover"
        />
        {/* Position Badge */}
        <div
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-sm font-semibold ${position_type === "long"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {position_type.toUpperCase()}
        </div>
      </div>

      {/* Info Container - 40% height */}
      <div className="flex h-[40%] flex-col justify-between p-4">
        {/* Coin Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{name}</h2>
          <p className="text-sm uppercase text-gray-500">{symbol}</p>
        </div>

        {/* Price Info */}
        <div className="space-y-2">
          {/* Entry Price */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Entry</span>
            <span className="font-medium">${entry_price.toFixed(6)}</span>
          </div>

          {/* Take Profit */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Take Profit</span>
            <span className="font-medium text-green-600">
              ${take_profit.toFixed(6)}
            </span>
          </div>

          {/* Stop Loss */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Stop Loss</span>
            <span className="font-medium text-red-600">
              ${stop_loss.toFixed(6)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface SwipeCardsProps {
  setIsDragging: (isDragging: boolean) => void;
  setShowMoreInfo: (showMoreInfo: boolean) => void;
  setDragSide: (dragSide: "left" | "right") => void;
  onCardView: (card: SwipeCard | null) => void;
}

const SwipeCards = ({
  setIsDragging,
  setShowMoreInfo,
  setDragSide,
  onCardView,
}: SwipeCardsProps) => {
  const { session } = useSessionStore();
  const { cards, setCards, markAsSeen } = useSwipeCardStore();
  const { isLoading, refetch } = useGetSwipeCards(session?.user?.email || "", {
    enabled: false, // Disable automatic fetching
  });

  // Function to fetch new cards
  const fetchNewCards = async () => {
    const result = await refetch();
    if (result.data?.coins) {
      const uniqueCards = result.data.coins.filter(
        (card, index, self) =>
          index === self.findIndex((c) => c.id === card.id),
      ) as unknown as SwipeCard[];
      setCards(uniqueCards);
    }
  };

  // Initial load - fetch cards only if store is empty
  useEffect(() => {
    if (!cards?.length) {
      fetchNewCards();
    }
  }, []);

  // Watch for low card count and fetch more
  useEffect(() => {
    if (cards?.length <= 5) {
      fetchNewCards();
    }
  }, [cards?.length]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div>
          <BarLoader />
        </div>
      </div>
    );
  }

  if (!cards?.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-xl text-gray-500">No more cards to show</p>
      </div>
    );
  }

  return (
    <div className="grid h-full w-full place-items-center">
      {cards.map((card, index) => (
        <Card
          key={`${card.id}-${index}`}
          cards={cards as SwipeCard[]}
          setCards={(newCards: SwipeCard[]) => {
            markAsSeen(card.id);
            setCards(newCards);
          }}
          {...{
            ...card,
            position_type: card.position_type as "long" | "short",
          }}
          url={card.image.large}
          setIsDragging={setIsDragging}
          setShowMoreInfo={setShowMoreInfo}
          setDragSide={setDragSide}
          onCardView={onCardView}
        />
      ))}
    </div>
  );
};

export default SwipeCards;

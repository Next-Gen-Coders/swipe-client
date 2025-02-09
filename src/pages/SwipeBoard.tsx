import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUserSettingsStore } from "@/stores/userSettingsStore";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SwipeCard } from "@/utils/Types";

import SwipeCards from "@/components/SwipeBoard/SwipeCards";
import OnboardingSliders from "@/components/SwipeBoard/OnboardingSliders";

import SwipeLogo from "@/assets/swipe_white_bg.svg";
import SwipeUp from "@/assets/swipeup.svg";
import Close from "@/assets/close.svg";

// Add this interface for the dummy data
interface PricePoint {
  time: string;
  price: number;
}

// Add this dummy data (replace with real data later)
const dummyPriceData: PricePoint[] = [
  { time: "00:00", price: 0.002 },
  { time: "04:00", price: 0.0022 },
  { time: "08:00", price: 0.0021 },
  { time: "12:00", price: 0.0023 },
  { time: "16:00", price: 0.0024 },
  { time: "20:00", price: 0.0025 },
  { time: "24:00", price: 0.0026 },
];

const SwipeBoard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [dragSide, setDragSide] = useState<"left" | "right">("left");
  const { onboardingCompleted, setOnboardingCompleted } =
    useUserSettingsStore();
  const [currentCard, setCurrentCard] = useState<SwipeCard | null>(null);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-violet-100">
      <AnimatePresence>
        {showMoreInfo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-30 bg-violet-900 bg-opacity-50 backdrop-blur-[10px]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, top: "30%" }}
              animate={{ opacity: 1, top: "50%" }}
              exit={{ opacity: 0, top: "30%" }}
              transition={{ duration: 0.5 }}
              className="absolute left-1/2 top-1/2 z-30 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white p-6 pt-10"
            >
              <div
                className="absolute right-5 top-5 flex cursor-pointer items-center justify-center"
                onClick={() => setShowMoreInfo(false)}
              >
                <motion.img
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                  src={Close}
                  alt="Close"
                  className="h-7 w-auto"
                />
              </div>
              <div className="flex h-full flex-col gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={currentCard?.image.large}
                    alt=""
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentCard?.name}
                    </h2>
                    <p className="text-lg uppercase text-gray-500">
                      {currentCard?.symbol}
                    </p>
                  </div>
                  <div
                    className={`ml-auto rounded-full px-4 py-2 text-sm font-semibold ${
                      currentCard?.position_type === "long"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {currentCard?.position_type.toUpperCase()}
                  </div>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dummyPriceData}>
                      <defs>
                        <linearGradient
                          id="colorPrice"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Entry</p>
                    <p
                      className="truncate text-xs font-bold"
                      title={`$${currentCard?.entry_price.toFixed(6)}`}
                    >
                      ${currentCard?.entry_price.toFixed(6)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-green-50 p-4">
                    <p className="text-sm text-gray-500">TP</p>
                    <p
                      className="truncate text-xs font-bold text-green-600"
                      title={`$${currentCard?.take_profit.toFixed(6)}`}
                    >
                      ${currentCard?.take_profit.toFixed(6)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="text-sm text-gray-500">SL</p>
                    <p
                      className="truncate text-xs font-bold text-red-600"
                      title={`$${currentCard?.stop_loss.toFixed(6)}`}
                    >
                      ${currentCard?.stop_loss.toFixed(6)}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Trading Analysis
                  </h3>
                  <p className="text-gray-700">{currentCard?.reasoning}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Contract Details
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-500">
                      <span className="mb-1 block">Contract Address:</span>
                      <span className="break-all font-mono text-violet-600">
                        {currentCard?.base_contract}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>24h Change:</span>
                      <span
                        className={`ml-2 font-semibold ${
                          (currentCard?.price_change_24h || 0) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {currentCard?.price_change_24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isDragging && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute left-1/2 top-[10%] flex -translate-x-1/2 items-center justify-center gap-2 font-bold text-violet-700"
            >
              More Info
              <motion.img
                initial={{ translateY: 0 }}
                animate={{ translateY: -4 }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                src={SwipeUp}
                alt="Swipe Up"
                className="h-7 w-auto"
              />
            </motion.div>
          </>
        )}

        {isDragging && dragSide === "right" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute right-0 top-1/2 h-[60%] w-[30%] -translate-y-1/2 translate-x-1/2 bg-gradient-to-r from-transparent to-green-600 blur-3xl"
          ></motion.div>
        )}
        {isDragging && dragSide === "left" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-1/2 h-[60%] w-[30%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-700 to-transparent blur-3xl"
          ></motion.div>
        )}
      </AnimatePresence>
      <div className="absolute flex w-full pb-4 pl-4">
        <img src={SwipeLogo} alt="Swipe Logo" className="h-24" />
      </div>
      {onboardingCompleted ? (
        <SwipeCards
          setIsDragging={setIsDragging}
          setShowMoreInfo={(show) => {
            setShowMoreInfo(show);
            if (!show) setCurrentCard(null);
          }}
          setDragSide={setDragSide}
          onCardView={setCurrentCard}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {/* Onboarding Questions */}
          <OnboardingSliders onComplete={() => setOnboardingCompleted(true)} />
        </div>
      )}
    </div>
  );
};

export default SwipeBoard;

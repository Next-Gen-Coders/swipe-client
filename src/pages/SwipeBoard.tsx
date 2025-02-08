import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import SwipeCards from "@/components/SwipeBoard/SwipeCards";

import SwipeLogo from "@/assets/logo.png";
import SwipeUp from "@/assets/swipeup.svg";
import Close from "@/assets/close.svg";

const SwipeBoard = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#020617]">
      <motion.div
        className="absolute inset-0 m-auto h-[70%] w-auto bg-[#0b174d] blur-3xl"
        animate={{
          scale: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      ></motion.div>
      <AnimatePresence>
        {showMoreInfo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-30 bg-black bg-opacity-15 filter backdrop-blur-[10px]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, top: "30%" }}
              animate={{ opacity: 1, top: "45%" }}
              exit={{ opacity: 0, top: "30%" }}
              transition={{ duration: 0.5 }}
              className="margin-auto absolute left-1/2 top-1/2 z-30 flex h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-[#0b174d] text-white"
            >
              <div
                className="absolute right-5 top-5 flex items-center justify-center"
                onClick={() => setShowMoreInfo(false)}
              >
                <img src={Close} alt="Close" className="h-7 w-auto" />
              </div>
              More Info
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
              className="absolute left-1/2 top-[10%] flex -translate-x-1/2 flex-col items-center justify-center font-bold text-gray-500"
            >
              <img src={SwipeUp} alt="Swipe Up" className="h-7 w-auto" />
              More Info
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -right-32 top-1/2 h-[60%] w-[30%] -translate-y-1/2 bg-green-500 blur-3xl"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute -left-32 top-1/2 h-[60%] w-[30%] -translate-y-1/2 bg-red-500 blur-3xl"
            ></motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="absolute flex w-full justify-center py-4">
        <img src={SwipeLogo} alt="Swipe Logo" className="h-auto max-w-[30%]" />
      </div>
      <SwipeCards
        setIsDragging={setIsDragging}
        setShowMoreInfo={setShowMoreInfo}
      />
    </div>
  );
};

export default SwipeBoard;

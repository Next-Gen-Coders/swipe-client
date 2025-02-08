import { AnimatePresence, motion } from "framer-motion";

const AiChat = ({
  isUnmute,
  amplitude,
}: {
  isUnmute: boolean;
  amplitude: number;
  setIsChatOpen: (open: boolean) => void;
  setIsUnmute: (unmute: boolean) => void;
}) => {
  return (
    <>
      Chat With AI ✨
      <AnimatePresence initial={false}>
        {isUnmute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              className="absolute -bottom-10 left-0 z-10 h-28 w-full overflow-hidden blur-3xl"
              style={{
                background: `linear-gradient(90deg, 
                                    rgba(59,130,246,${0.4 + amplitude * 1}) 0%, 
                                    rgba(147,51,234,${0.4 + amplitude * 1}) 50%, 
                                    rgba(236,72,153,${0.4 + amplitude * 1}) 100%)`,
                transform: `scaleY(${0.3 + amplitude * 3})`,
                transition: "transform 0.1s ease-out",
                boxShadow: `0 0 30px 10px rgba(147,51,234,${0.3 + amplitude * 0.7})`,
              }}
            />
            <div
              className="absolute -bottom-10 left-0 z-30 h-10 w-full overflow-hidden blur-xl"
              style={{
                background: `linear-gradient(90deg, 
                                    rgba(59,130,246,${0.6 + amplitude * 3}) 0%, 
                                    rgba(147,51,234,${0.6 + amplitude * 3}) 50%, 
                                    rgba(236,72,153,${0.6 + amplitude * 3}) 100%)`,
                transform: `scaleY(${0.2 + amplitude * 3})`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChat;

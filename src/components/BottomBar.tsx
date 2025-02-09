import { useNavigate, useLocation } from "react-router-dom";
import { Mic, MicOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import AiChat from "./AiChat/AiChat";

import Transactions from "@/assets/transactions.svg";
import Portfolio from "@/assets/portfolio.svg";
import { useState, useEffect, useRef } from "react";

const BottomBar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isUnmute, setIsUnmute] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const NavButton = ({
    to,
    icon,
    alt,
  }: {
    to: string;
    icon: string;
    alt: string;
  }) => (
    <button
      onClick={() => {
        navigate(to);
        setIsChatOpen(false);
        setIsUnmute(false);
      }}
      className={`transform rounded-xl p-3 transition-all duration-300 active:scale-95 active:border-white/30 active:bg-white/20 ${
        location.pathname === to
          ? `border-white/30 bg-white/20 backdrop-blur-md`
          : ""
      } focus:outline-none focus:ring-2 focus:ring-violet-50`}
      aria-label={alt}
    >
      <img src={icon} alt={alt} className="h-8 opacity-90" />
    </button>
  );

  const handleAiChatClick = () => {
    setIsChatOpen(true);
    setIsUnmute(true);

    if (isUnmute) {
      setIsUnmute(false);
    }
  };

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      analyserRef.current.fftSize = 256;
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

      const updateAmplitude = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAmplitude(average / 128); // Normalize to 0-1
        requestAnimationFrame(updateAmplitude);
      };

      updateAmplitude();
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  useEffect(() => {
    if (isUnmute) {
      initializeAudio();
    } else {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    }
    return () => {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [isUnmute]);

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-28 left-4 z-10 flex min-h-[50%] w-[calc(100%-2rem)] items-center justify-center rounded-b-3xl rounded-t-3xl bg-violet-800 text-white"
            >
              <AiChat
                isUnmute={isUnmute}
                amplitude={amplitude}
                setIsChatOpen={setIsChatOpen}
                setIsUnmute={setIsUnmute}
              />
            </motion.div>
            <div
              className="fixed inset-0 z-[5] bg-black bg-opacity-15 backdrop-blur-sm duration-200"
              onClick={() => {
                setIsChatOpen(false);
                setIsUnmute(false);
              }}
            />
          </>
        )}
      </AnimatePresence>

      <div
        className={`absolute bottom-5 left-1/2 z-20 m-auto flex w-[95%] -translate-x-1/2 items-center justify-around rounded-3xl bg-violet-800 py-2 shadow-lg shadow-black/50`}
      >
        <NavButton to="/transactions" icon={Transactions} alt="Transactions" />

        <button
          className="group relative z-20 h-16 w-16 rounded-full transition-all duration-300 focus:outline-none"
          aria-label="Microphone"
          onClick={() => handleAiChatClick()}
        >
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${isChatOpen ? "w-20" : "w-16"} flex aspect-square items-center justify-center rounded-full border-[3px] backdrop-blur-md ${isUnmute ? "border-violet-100 bg-blue-400/10" : "border-white/30 bg-white/10"} transition-all duration-300 hover:bg-white/20`}
          >
            <div className="flex aspect-square h-[90%] items-center justify-center rounded-full bg-white/10 shadow-inner shadow-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
              {!isChatOpen || isUnmute ? (
                <Mic
                  className={`h-7 w-7 ${isUnmute ? "text-violet-100" : "text-white/90"}`}
                />
              ) : (
                <MicOff className="h-7 w-7 text-white/90" />
              )}
            </div>
          </div>
        </button>

        <NavButton to="/portfolio" icon={Portfolio} alt="Portfolio" />
      </div>
    </>
  );
};

export default BottomBar;

 import { useNavigate, useLocation } from "react-router-dom";
import { Mic, MicOff } from 'lucide-react';
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


    const NavButton = ({ to, icon, alt }: { to: string; icon: string; alt: string }) => (
        <button
            onClick={() => {
                navigate(to);
                setIsChatOpen(false);
                setIsUnmute(false);
            }}
            className={`p-3 rounded-xl transition-all duration-300 
                active:bg-white/20 active:border-white/30 
                active:scale-95 transform
                ${location.pathname === to ? `
                    bg-white/20 
                    border-white/30 
                    backdrop-blur-md 
                    shadow-[0_0_15px_-3px_rgba(59,130,246,0.3),0_0_25px_-5px_rgba(147,51,234,0.2)]
                    before:absolute before:inset-0 before:bg-gradient-to-r 
                    before:from-blue-400/20 before:via-purple-400/20 before:to-pink-400/20 
                    before:blur-xl before:-z-10
                ` : ''}                focus:outline-none focus:ring-2 focus:ring-blue-300`}
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
    }

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
            mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        }
        return () => {
            mediaStreamRef.current?.getTracks().forEach(track => track.stop());
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
                            className="fixed flex justify-center items-center min-h-[500px] w-[99%] 
                         bg-[#020617]/80 backdrop-blur-md
                         border-blue-400/50 border rounded-t-3xl 
                         text-white bottom-0 z-10
                         shadow-lg shadow-blue-400/20
                         bg-gradient-to-b from-transparent to-[#020617]/90 max-w-[768px]"
                        >
                            <AiChat isUnmute={isUnmute} amplitude={amplitude} setIsChatOpen={setIsChatOpen} setIsUnmute={setIsUnmute} />
                        </motion.div>
                        <div
                            className="fixed inset-0 z-[5] bg-black filter backdrop-blur-[7px] bg-opacity-15"
                            onClick={() => {
                                setIsChatOpen(false);
                                setIsUnmute(false);
                            }}
                        />
                    </>
                )}
            </AnimatePresence>

            <div className={`w-[95%] m-auto absolute left-1/2 -translate-x-1/2 bottom-5 rounded-3xl  ${isChatOpen ? '' : 'backdrop-blur-lg bg-[#0b174d]/80  border-t border-white/10 shadow-lg shadow-black/50'} flex justify-around items-center py-2 z-20`}>

                <NavButton to="/transactions" icon={Transactions} alt="Transactions" />

                <button
                    className="relative h-16 w-16 transition-all duration-300
                        focus:outline-none group
                        rounded-full z-20"
                    aria-label="Microphone"
                    onClick={() => handleAiChatClick()}
                >
                    <div className={`absolute -translate-x-1/2 left-1/2 bottom-0 ${isChatOpen ? "w-20" : "w-16"} aspect-square 
                        flex justify-center items-center rounded-full 
                        border-[3px] backdrop-blur-md 
                        ${isUnmute ? 'border-blue-300 bg-blue-400/10' : 'border-white/30 bg-white/10'} 
                        transition-all duration-300 hover:bg-white/20`}>
                        <div className="bg-white/10 h-[90%] flex justify-center items-center 
                            aspect-square rounded-full hover:bg-white/20 
                            backdrop-blur-sm transition-all duration-300
                            shadow-inner shadow-white/10">
                            {!isChatOpen || isUnmute ? (
                                <Mic className={`h-7 w-7 ${isUnmute ? 'text-blue-300' : 'text-white/90'}`} />
                            ) : (
                                <MicOff className="h-7 w-7 text-white/90" />
                            )}
                        </div>
                    </div>
                </button>

                <NavButton to="/portfolio" icon={Portfolio} alt="Portfolio" />
            </div>
        </>
    )
}

export default BottomBar

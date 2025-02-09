import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUserSettingsStore } from "@/stores/userSettingsStore";

import SwipeCards from "@/components/SwipeBoard/SwipeCards";
import OnboardingSliders from "@/components/SwipeBoard/OnboardingSliders";

import SwipeLogo from "@/assets/swipe_white_bg.svg";
import SwipeUp from "@/assets/swipeup.svg";
import Close from "@/assets/close.svg";


const SwipeBoard = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [dragSide, setDragSide] = useState<"left" | "right">("left");
    const { onboardingCompleted, setOnboardingCompleted } = useUserSettingsStore();

    return (
        <div className="flex h-full w-full overflow-hidden relative bg-violet-100">

            <AnimatePresence>
                {showMoreInfo && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-violet-900 backdrop-blur-[10px] bg-opacity-50 z-30">


                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, top: "30%" }}
                            animate={{ opacity: 1, top: "50%" }}
                            exit={{ opacity: 0, top: "30%" }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-[90%] rounded-3xl bg-violet-200 margin-auto flex items-center justify-center z-30">
                            <div className="absolute top-5 right-5 flex items-center justify-center "
                                onClick={() => setShowMoreInfo(false)}
                            >
                                <motion.img initial={{ rotate: 0 }}
                                    animate={{ rotate: 90 }}
                                    transition={{ duration: 0.2, delay: 0.4 }}
                                    src={Close} alt="Close" className="h-7 w-auto" />
                            </div>
                            More Info
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {
                    isDragging && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-[10%] left-1/2 -translate-x-1/2 text-violet-700 font-bold flex  items-center justify-center gap-2">
                                More Info
                                <motion.img initial={{ translateY: 0 }}
                                    animate={{ translateY: -4 }}
                                    transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}

                                    src={SwipeUp} alt="Swipe Up" className="h-7 w-auto" />
                            </motion.div>


                        </>
                    )
                }

                {
                    isDragging && dragSide === "right" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute h-[60%] w-[30%] right-0 translate-x-1/2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent  to-green-600 blur-3xl">
                        </motion.div>
                    )
                }
                {
                    isDragging && dragSide === "left" && (

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute h-[60%] w-[30%] left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-700 to-transparent blur-3xl">
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <div className="absolute w-full flex pb-4 pl-4">
                <img src={SwipeLogo} alt="Swipe Logo" className="h-24 " />
            </div>
            {
                onboardingCompleted ? <SwipeCards setIsDragging={setIsDragging} setShowMoreInfo={setShowMoreInfo} setDragSide={setDragSide} />
                    : (
                        <div className="w-full h-full flex items-center justify-center">
                            {/* Onboarding Questions */}
                            <OnboardingSliders onComplete={() => setOnboardingCompleted(true)} />
                        </div>
                    )
            }
        </div >
    )
}

export default SwipeBoard

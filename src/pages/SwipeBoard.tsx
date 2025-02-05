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
        <div className="flex h-full w-full bg-[#020617] relative overflow-hidden">
            <motion.div className="bg-[#0b174d] absolute inset-0 m-auto h-[70%] w-auto blur-3xl"
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
                            className="absolute inset-0 bg-black filter backdrop-blur-[10px] bg-opacity-15 z-10">
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, top: "30%" }}
                            animate={{ opacity: 1, top: "50%" }}
                            exit={{ opacity: 0, top: "30%" }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-[90%] rounded-3xl bg-[#0b174d] margin-auto flex items-center justify-center z-10 text-white ">
                            <div className="absolute top-5 right-5 flex items-center justify-center"
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
                {
                    isDragging && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-[17%] left-1/2 -translate-x-1/2 text-gray-500 font-bold flex flex-col items-center justify-center">
                                <img src={SwipeUp} alt="Swipe Up" className="h-7 w-auto" />
                                More Info
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute bg-green-500 h-[60%] w-[30%] -right-32 top-1/2 -translate-y-1/2 blur-3xl">
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute bg-red-500 h-[60%] w-[30%] -left-32 top-1/2 -translate-y-1/2 blur-3xl">
                            </motion.div>
                        </>
                    )
                }
            </AnimatePresence>
            <div className="absolute w-full flex justify-center py-4">
                <img src={SwipeLogo} alt="Swipe Logo" className="max-w-[30%] h-auto" />
            </div>
            <SwipeCards setIsDragging={setIsDragging} setShowMoreInfo={setShowMoreInfo} />
        </div >
    )
}

export default SwipeBoard

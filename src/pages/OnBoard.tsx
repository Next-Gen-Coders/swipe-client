import { motion } from "motion/react"
import { useState } from "react";

import CtaButton from "@/components/CtaButton";

import logo from "@/assets/logo.png"
import { Bitcoin, Strikethrough, ChartNoAxesColumnIncreasing, ChartNoAxesColumn } from "lucide-react"

const OnBoard = () => {
    const [riskRangeValue, setriskRangeValue] = useState(50);

    return (
        <div className="flex h-full w-full bg-[#020617] relative overflow-hidden">
            <motion.div className="bg-[#0b174d] absolute inset-0 m-auto h-[90%] w-[90%] blur-3xl"
                animate={{
                    scale: [1, 0.9, 1],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            ></motion.div>
            <motion.div className="absolute w-[15rem] h-[23rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-xl border border-white/20 bg-slate-800/70 filter backdrop-blur-sm"
                initial={{ scale: 0, rotate: 5, x: "-50%", y: "-50%" }}
                animate={{
                    scale: 1,
                    rotate: -12,
                    x: "-300%",
                    transition: {
                        scale: { duration: 0.5, delay: 0.5 },
                        rotate: { duration: 0.5, delay: 1.7 },
                        x: { duration: 0.6, delay: 1.7 },
                    }
                }}
                exit={{ opacity: 0 }}
            >
                <Strikethrough className="text-blue-600 h-28 w-28  absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <ChartNoAxesColumn className="text-yellow-300 h-36 w-36 absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
            <motion.div className="absolute w-[15rem] h-[23rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/30 bg-slate-800/70 filter backdrop-blur-lg"
                initial={{ scale: 0, rotate: -12, x: "-50%", y: "-50%" }}
                animate={{
                    scale: 1,
                    rotate: 12,
                    x: "200%",
                    transition: {
                        scale: { duration: 0.5, delay: 0.5 },
                        rotate: { duration: 0.5, delay: 1.2 },
                        x: { duration: 0.7, delay: 1.2 },
                    }
                }}
                exit={{ opacity: 0 }}
            >
                <Bitcoin className="text-orange-300 h-28 w-28 -rotate-12 absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <ChartNoAxesColumnIncreasing className="text-green-600 h-36 w-36 absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>

            <motion.div className="absolute w-full top-[20%] text-white text-center text-3xl font-bold flex flex-col gap-5 justify-center items-center overflow-hidden "
                initial={{ height: 0, filter: "blur(10px)" }}
                animate={{
                    height: "auto",
                    filter: "blur(0px)",
                    transition: { height: { duration: 0.5, delay: 2 }, filter: { duration: 0.3, delay: 2 } }
                }}
            >
                <p>Welcome to</p>
                <img src={logo} alt="logo" className="h-24 w-auto" />
            </motion.div>

            <motion.div className="absolute w-full top-[50%] text-white text-center text-lg font-bold flex flex-col gap-5 justify-center items-center overflow-hidden "
                initial={{ height: 0, filter: "blur(10px)", padding: 0 }}
                animate={{
                    height: "auto",
                    padding: "3px",
                    filter: "blur(0px)",
                    transition: { height: { duration: 0.5, delay: 2 }, filter: { duration: 0.3, delay: 2 } }
                }}
            >
                <p>Enter your risk tolerance</p>

                <div className="relative w-[80%] flex items-center gap-4 touch-none">
                    <input
                        title="Risk Tolerance"
                        type="range"
                        min="0"
                        max="100"
                        step="10"
                        value={riskRangeValue}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setriskRangeValue(value);
                        }}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer
                            bg-white/10 backdrop-blur-sm
                            border border-white/20
                            relative
                            transition-all duration-300 ease-out
                            [&::-webkit-slider-runnable-track]:rounded-lg
                            [&::-webkit-slider-runnable-track]:bg-white/10
                            [&::-webkit-slider-runnable-track]:h-2
                            [&::-webkit-slider-runnable-track]:transition-all
                            [&::-webkit-slider-runnable-track]:duration-300
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:w-5
                            [&::-webkit-slider-thumb]:h-5
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-gradient-to-r
                            [&::-webkit-slider-thumb]:from-blue-400
                            [&::-webkit-slider-thumb]:to-purple-400
                            [&::-webkit-slider-thumb]:border
                            [&::-webkit-slider-thumb]:border-white/40
                            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(59,130,246,0.5)]
                            [&::-webkit-slider-thumb]:backdrop-blur-sm
                            [&::-webkit-slider-thumb]:transition-all
                            [&::-webkit-slider-thumb]:duration-300
                            [&::-webkit-slider-thumb]:ease-out
                            hover:[&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(59,130,246,0.7)]
                            [&::-webkit-slider-thumb]:translate-y-[-5px]
                            [&::-moz-range-track]:rounded-lg
                            [&::-moz-range-track]:bg-white/10
                            [&::-moz-range-track]:h-2
                            [&::-moz-range-track]:transition-all
                            [&::-moz-range-track]:duration-300
                            [&::-moz-range-thumb]:appearance-none
                            [&::-moz-range-thumb]:w-5
                            [&::-moz-range-thumb]:h-5
                            [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:transition-all
                            [&::-moz-range-thumb]:duration-300
                            [&::-moz-range-thumb]:ease-out"
                        style={{
                            background: `linear-gradient(to right, 
                                rgb(59 130 246) 0%, 
                                rgb(147 51 234) ${riskRangeValue}%, 
                                rgba(255, 255, 255, 0.1) ${riskRangeValue}%, 
                                rgba(255, 255, 255, 0.1) 100%)`,
                            transition: 'all 0.3s ease-out'
                        }}
                    />
                    <span className="text-white/70 text-sm min-w-[3ch]">
                        {riskRangeValue}%
                    </span>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 2.1,
                    duration: 0.5,
                    ease: "easeInOut"
                }}
                className="absolute w-full top-[80%] flex justify-center items-center">
                <CtaButton
                    onClick={() => {
                        console.log("clicked")
                    }}
                    title="Continue"
                >
                    Let's Go!
                </CtaButton>
            </motion.div>
        </div >
    )
}

export default OnBoard
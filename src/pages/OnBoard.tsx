import { motion } from "motion/react";
import { useState } from "react";

import CtaButton from "@/components/CtaButton";

import logo from "@/assets/logo.png";
import {
  Bitcoin,
  Strikethrough,
  ChartNoAxesColumnIncreasing,
  ChartNoAxesColumn,
} from "lucide-react";

const OnBoard = () => {
  const [riskRangeValue, setriskRangeValue] = useState(50);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#020617]">
      <motion.div
        className="absolute inset-0 m-auto h-[90%] w-[90%] bg-[#0b174d] blur-3xl"
        animate={{
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      ></motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[23rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-xl border border-white/20 bg-slate-800/70 filter backdrop-blur-sm"
        initial={{ scale: 0, rotate: 5, x: "-50%", y: "-50%" }}
        animate={{
          scale: 1,
          rotate: -12,
          x: "-300%",
          transition: {
            scale: { duration: 0.5, delay: 0.5 },
            rotate: { duration: 0.5, delay: 1.7 },
            x: { duration: 0.6, delay: 1.7 },
          },
        }}
        exit={{ opacity: 0 }}
      >
        <Strikethrough className="absolute left-1/2 top-[30%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 text-blue-600" />
        <ChartNoAxesColumn className="absolute left-1/2 top-[70%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 text-yellow-300" />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[23rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/30 bg-slate-800/70 filter backdrop-blur-lg"
        initial={{ scale: 0, rotate: -12, x: "-50%", y: "-50%" }}
        animate={{
          scale: 1,
          rotate: 12,
          x: "200%",
          transition: {
            scale: { duration: 0.5, delay: 0.5 },
            rotate: { duration: 0.5, delay: 1.2 },
            x: { duration: 0.7, delay: 1.2 },
          },
        }}
        exit={{ opacity: 0 }}
      >
        <Bitcoin className="absolute left-1/2 top-[30%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 -rotate-12 text-orange-300" />
        <ChartNoAxesColumnIncreasing className="absolute left-1/2 top-[70%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 text-green-600" />
      </motion.div>

      <motion.div
        className="absolute top-[20%] flex w-full flex-col items-center justify-center gap-5 overflow-hidden text-center text-3xl font-bold text-white"
        initial={{ height: 0, filter: "blur(10px)" }}
        animate={{
          height: "auto",
          filter: "blur(0px)",
          transition: {
            height: { duration: 0.5, delay: 2 },
            filter: { duration: 0.3, delay: 2 },
          },
        }}
      >
        <p>Welcome to</p>
        <img src={logo} alt="logo" className="h-24 w-auto" />
      </motion.div>

      <motion.div
        className="absolute top-[50%] flex w-full flex-col items-center justify-center gap-5 overflow-hidden text-center text-lg font-bold text-white"
        initial={{ height: 0, filter: "blur(10px)", padding: 0 }}
        animate={{
          height: "auto",
          padding: "3px",
          filter: "blur(0px)",
          transition: {
            height: { duration: 0.5, delay: 2 },
            filter: { duration: 0.3, delay: 2 },
          },
        }}
      >
        <p>Enter your risk tolerance</p>

        <div className="relative flex w-[80%] touch-none items-center gap-4">
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
            className="relative h-2 w-full cursor-pointer appearance-none rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 ease-out [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-300 [&::-moz-range-thumb]:ease-out [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:bg-white/10 [&::-moz-range-track]:transition-all [&::-moz-range-track]:duration-300 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-runnable-track]:transition-all [&::-webkit-slider-runnable-track]:duration-300 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:translate-y-[-5px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white/40 [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-400 [&::-webkit-slider-thumb]:to-purple-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(59,130,246,0.5)] [&::-webkit-slider-thumb]:backdrop-blur-sm [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300 [&::-webkit-slider-thumb]:ease-out hover:[&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(59,130,246,0.7)]"
            style={{
              background: `linear-gradient(to right, 
                                rgb(59 130 246) 0%, 
                                rgb(147 51 234) ${riskRangeValue}%, 
                                rgba(255, 255, 255, 0.1) ${riskRangeValue}%, 
                                rgba(255, 255, 255, 0.1) 100%)`,
              transition: "all 0.3s ease-out",
            }}
          />
          <span className="min-w-[3ch] text-sm text-white/70">
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
          ease: "easeInOut",
        }}
        className="absolute top-[80%] flex w-full items-center justify-center"
      >
        <CtaButton
          onClick={() => {
            console.log("clicked");
          }}
          title="Continue"
        >
          Let's Go!
        </CtaButton>
      </motion.div>
    </div>
  );
};

export default OnBoard;

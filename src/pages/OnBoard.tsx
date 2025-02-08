import { useEffect, useState } from "react";
import IntroCard from "@/components/IntroCard";
import { easeInOut, motion, AnimatePresence } from "motion/react"


import ethereum from "@/assets/coins/ethereum.svg"
import polygon from "@/assets/coins/polygon.svg"
import swipe from "@/assets/swipe_white_bg.svg"
import SignIn from "@/components/SignIn";

const OnBoard = () => {
  const [startSecondAnimation, setStartSecondAnimation] = useState(false);
  const [hideCard, setHideCard] = useState(false);
  const [hideRed, setHideRed] = useState(false);
  const [hideGreen, setHideGreen] = useState(false);



  useEffect(() => {
    const timers = [
      setTimeout(() => setStartSecondAnimation(true), 1200),
      setTimeout(() => setHideCard(true), 3100),
      setTimeout(() => setHideRed(true), 1100),
      setTimeout(() => setHideGreen(true), 2300),
    ];
  
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className='h-full w-full bg-violet-300 overflow-hidden relative'>
      {
        !hideCard && (
          <div className="h-full w-full absolute z-10">
            <motion.div initial={{ opacity: 0.5, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2, ease: easeInOut }} className="h-full w-full   flex items-center overflow-hidden relative">
              <motion.div initial={{ opacity: 0.5, rotate: 6 }}
                animate={
                  startSecondAnimation
                    ? { opacity: 0.5, rotate: 20, translateX: "100%" }
                    : { opacity: 1, rotate: 0 }
                }
                transition={{ duration: 0.2, ease: "easeInOut", delay: 1 }} className="min-h-fit w-full absolute">
                <IntroCard image={polygon} name="Polygon" price="2500" />
              </motion.div>
              <motion.div initial={{ rotate: 0, opacity: 1 }} animate={{ rotate: -20, opacity: 0.5, translateX: "-100%" }} transition={{ delay: 1, duration: 0.4, ease: easeInOut }} className="h-fit w-full absolute rotate-6">
                <IntroCard image={ethereum} name="Ethereum" price="3500" />
              </motion.div>
            </motion.div>
          </div>
        )
      }


        {
          !hideRed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} transition={{ duration: 0.1, delay: 1 }} className="w-1/5 absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-transparent">
            </motion.div>
          )
        }

        {
          !hideGreen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} transition={{ duration: 0.1, delay: 2.1 }} className="w-1/5 absolute top-0 right-0 h-full bg-gradient-to-r from-transparent to-green-600">

            </motion.div>
          )
        }

      <div className="h-full w-full flex flex-col items-center justify-center ">
        <motion.img
          src={swipe}
          alt="swipe"
          className="h-[10rem] md:h-[12rem]"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.2, 1] }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 2.5 }}
        />
        <SignIn />
      </div>
    </div>
  )
}

export default OnBoard

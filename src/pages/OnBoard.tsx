import { useEffect, useState } from "react";
import IntroCard from "@/components/IntroCard";
import { easeInOut, motion } from "motion/react"


import ethereum from "@/assets/coins/ethereum.svg"
import polygon from "@/assets/coins/polygon.svg"
import swipe from "@/assets/swipe_white_bg.svg"
import SignIn from "@/components/SignIn";

const OnBoard = () => {
  const [startSecondAnimation, setStartSecondAnimation] = useState(false);
  const [hideCard, setHideCard] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setStartSecondAnimation(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideCard(true);
    }, 3100);

    return () => clearTimeout(timer);
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

      <div className="h-full w-full flex flex-col justify-center items-center py-[30%]">
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

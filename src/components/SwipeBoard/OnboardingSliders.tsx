import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreateUser } from "@/hooks/apis/useCreateUser";
import { useSessionStore } from "@/stores/sessionStore";

import { RiskToleranceLevel } from "@/utils/Types";

interface OnboardingSlidersProps {
    onComplete: () => void;
}


const OnboardingSliders = ({ onComplete }: OnboardingSlidersProps) => {
    const [riskTolerance, setRiskTolerance] = useState(1);
    const [cryptoExperience, setCryptoExperience] = useState(5);

    const { session } = useSessionStore();
    const createUser = useCreateUser();

    const handleOnComplete = () => {
        if (!session) return;

        createUser.mutate({
            session,
            riskTolerance: getRiskLabel(riskTolerance) as RiskToleranceLevel,
            cryptoExperience: cryptoExperience,
        }, {
            onError: (error) => {
                console.error("Error creating user:", error);
                return;
            },
        });

        onComplete();
    };

    const getRiskLabel = (value: number) => {
        switch (value) {
            case 0: return 'low';
            case 1: return 'medium';
            case 2: return 'high';
            default: return null;
        }
    };

    return (
        <div className="w-full max-w-md px-6 py-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Let's personalize your experience
            </h2>

            {/* Risk Tolerance Slider */}
            <div className="mb-8">
                <label className="block text-gray-800 font-medium mb-2 text-sm">
                    Risk Tolerance
                </label>
                <div className="relative w-full flex items-center gap-4 touch-none">
                    <input
                        type="range"
                        min="0"
                        max="2"
                        step="1"
                        value={riskTolerance}
                        onChange={(e) => setRiskTolerance(parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200
                            [&::-webkit-slider-thumb]:relative
                            [&::-webkit-slider-thumb]:z-20
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:w-5
                            [&::-webkit-slider-thumb]:h-5
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-gradient-to-r
                            [&::-webkit-slider-thumb]:from-violet-400
                            [&::-webkit-slider-thumb]:to-fuchsia-400
                            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(167,139,250,0.5)]
                            [&::-webkit-slider-thumb]:transition-all
                            [&::-webkit-slider-thumb]:duration-300"
                        style={{
                            background: `linear-gradient(to right, 
                                rgb(167,139,250) 0%, 
                                rgb(192,132,252) ${riskTolerance * 50}%, 
                                rgba(229, 231, 235, 1) ${riskTolerance * 50}%)`
                        }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                </div>
            </div>

            {/* Experience Slider */}
            <div className="mb-8">
                <label className="block text-gray-800 font-medium mb-2 text-sm">
                    Experience Level: {cryptoExperience}
                </label>
                <div className="relative w-full flex items-center gap-4 touch-none">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={cryptoExperience}
                        onChange={(e) => setCryptoExperience(parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200
                            [&::-webkit-slider-thumb]:relative
                            [&::-webkit-slider-thumb]:z-20
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:w-5
                            [&::-webkit-slider-thumb]:h-5
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-gradient-to-r
                            [&::-webkit-slider-thumb]:from-violet-400
                            [&::-webkit-slider-thumb]:to-fuchsia-400
                            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(167,139,250,0.5)]
                            [&::-webkit-slider-thumb]:transition-all
                            [&::-webkit-slider-thumb]:duration-300"
                        style={{
                            background: `linear-gradient(to right, 
                                rgb(167,139,250) 0%, 
                                rgb(192,132,252) ${((cryptoExperience - 1) / 9) * 100}%, 
                                rgba(229, 231, 235, 1) ${((cryptoExperience - 1) / 9) * 100}%)`
                        }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                </div>
            </div>

            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleOnComplete}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r 
                    from-violet-500 to-fuchsia-500 
                    text-white font-medium
                    hover:from-violet-600 hover:to-fuchsia-600
                    transition-all duration-300"
            >
                Continue
            </motion.button>
        </div>
    );
};

export default OnboardingSliders;
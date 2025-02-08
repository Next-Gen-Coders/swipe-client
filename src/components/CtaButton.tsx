import { motion } from "framer-motion";

const CtaButton = ({ children, onClick, title = "Continue", className = "" }: { children: React.ReactNode, onClick: () => void, title?: string, className?: string }) => {
    return (
        <motion.button
            className={`
        relative overflow-hidden
        px-10 py-5 
        text-xl text-white font-medium
        rounded-lg
        border border-blue-300/50
        bg-gradient-to-r from-blue-400/10 to-blue-300/10
        backdrop-blur-md
        transition-all duration-300
        hover:border-blue-200
        hover:from-blue-400/20 hover:to-blue-300/20
        hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.2,
                ease: "easeInOut"
            }}
            onClick={onClick}
            title={title}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear"
                }}
            />
            {children}
        </motion.button>
    );
};

export default CtaButton;
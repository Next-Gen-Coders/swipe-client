import { motion } from "framer-motion";

const CtaButton = ({ children, onClick }: { children: React.ReactNode, onClick: () => void, title?: string, className?: string }) => {
    return (
        <motion.div
            onClick={onClick}
            initial={{ opacity: 0, y: 10, height: "0%" }} animate={{ opacity: 1, y: 0, height: "100%" }} transition={{ duration: 0.5, ease: "easeInOut", delay: 2.5 }} className="mt-4 w-full px-4 flex-grow flex flex-col justify-between">
            <div className="relative w-fit mx-auto mt-6">
                <button className="text-xl font-semibold bg-white px-4 py-2 rounded-full relative z-10">{children}</button>
                <div className="absolute top-1 left-1 w-full h-full rounded-full bg-violet-600">
                </div>
            </div>
        </motion.div>
    );
};

export default CtaButton;
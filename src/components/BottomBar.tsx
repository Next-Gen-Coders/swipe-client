import { useNavigate, useLocation } from "react-router-dom";
import { Mic } from 'lucide-react';

import Transactions from "@/assets/transactions.svg";
import Portfolio from "@/assets/portfolio.svg";


const BottomBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const NavButton = ({ to, icon, alt }: { to: string; icon: string; alt: string }) => (
        <button
            onClick={() => navigate(to)}
            className={`p-2 rounded-lg transition-all duration-200
                hover:bg-[#162169] active:scale-95
                ${location.pathname === to ? 'bg-[#162169]' : ''}
                focus:outline-none focus:ring-2 focus:ring-blue-400`}
            aria-label={alt}
        >
            <img src={icon} alt={alt} className="h-10" />
        </button>
    );

    return (
        <div className="w-full absolute bottom-0 rounded-t-3xl bg-[#0b174d] flex justify-around items-center py-3">
            <NavButton to="/transactions" icon={Transactions} alt="Transactions" />

            <button
                className="relative h-16 w-16 transition-transform active:scale-95
                    focus:outline-none group focus:ring-blue-400 rounded-full"
                aria-label="Microphone"
            >
                <div className="absolute -translate-x-1/2 left-1/2 bottom-2 w-20 aspect-square 
                    flex justify-center items-center rounded-full border-[3px] 
                    hover:border-blue-400 transition-colors">
                    <div className="bg-[#020617] h-[90%] flex justify-center items-center 
                        aspect-square rounded-full hover:bg-[#0a1030] transition-colors">
                        <Mic className="h-7 w-7 text-white group-focus:text-blue-400" />
                    </div>
                </div>
            </button>

            <NavButton to="/portfolio" icon={Portfolio} alt="Portfolio" />
        </div>
    )
}

export default BottomBar

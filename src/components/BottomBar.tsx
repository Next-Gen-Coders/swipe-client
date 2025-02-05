import { useNavigate } from "react-router-dom";

import Microphone from "@/assets/microphone.svg";
import Transactions from "@/assets/transactions.svg";
import Portfolio from "@/assets/portfolio.svg";

const BottomBar = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full absolute bottom-0 rounded-t-3xl bg-[#0b174d] flex justify-around items-center py-3">
            <div onClick={() => navigate("/transactions")}>
                <img src={Transactions} alt="Transactions" className="h-10" />
            </div>
            <div className="relative h-10 w-10">
                <div className="absolute -translate-x-1/2 left-1/2 bottom-1 w-20 aspect-square flex justify-center items-center rounded-full border-[3px]">
                    <div className="bg-[#020617] h-[87%] flex justify-center items-center aspect-square rounded-full">
                        <img src={Microphone} alt="Microphone" className="h-10 " />
                    </div>
                </div>
            </div>
            <div onClick={() => navigate("/portfolio")}>
                <img src={Portfolio} alt="Portfolio" className="h-10" />
            </div>
        </div>
    )
}

export default BottomBar

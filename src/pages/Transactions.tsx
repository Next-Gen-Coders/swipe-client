import { useNavigate } from "react-router"
import Back from "@/assets/back.svg"

const Transactions = () => {
    const navigate = useNavigate()

    return (
        <div className="flex h-full w-full bg-violet-100 relative">
            <div className="absolute top-4 left-3"
                onClick={() => navigate("/")}
            >
                <img src={Back} alt="back" className="h-8" />
            </div>
        </div>
    )
}

export default Transactions

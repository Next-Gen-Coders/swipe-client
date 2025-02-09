import { useNavigate } from "react-router";
import Back from "@/assets/back.svg";

const Transactions = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full w-full bg-violet-100">
      <div className="absolute left-3 top-4" onClick={() => navigate("/")}>
        <img src={Back} alt="back" className="h-8" />
      </div>
    </div>
  );
};

export default Transactions;

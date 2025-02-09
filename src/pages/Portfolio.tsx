import { useNavigate } from "react-router";
import Back from "@/assets/back.svg";
import SignOut from "@/components/SignOut";
import { useSessionStore } from "@/stores/sessionStore";

const Portfolio = () => {
  const navigate = useNavigate();
  const { session } = useSessionStore();

  console.log(session?.user.id);
  return (
    <div className="relative flex flex-col h-full w-full bg-violet-100 p-4 pt-12">
      <p className="text-2xl font-bold">Welcome , {session?.user.email}</p>
      <p className="text-sm text-gray-400">User ID: {session?.user.id}</p>
      <div className="absolute top-[80%] flex w-full items-center justify-center">
        <SignOut />
      </div>

      <div className="absolute left-3 top-4" onClick={() => navigate("/")}>
        <img src={Back} alt="back" className="h-8" />
      </div>
    </div>
  );
};

export default Portfolio;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/onboard");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />;
};

export default AppRoutes;

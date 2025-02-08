import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { useSessionStore } from "../stores/sessionStore";

const AppRoutes = () => {
  const { session, setSession } = useSessionStore();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {

      if (!session) {
        navigate("/");
      }

      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return session ? <PrivateRoutes /> : <PublicRoutes />;
};

export default AppRoutes;

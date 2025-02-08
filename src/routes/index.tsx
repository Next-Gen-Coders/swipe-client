import { useEffect } from "react";
import { supabase } from "../../supabaseClient";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { useSessionStore } from "../stores/sessionStore";

const AppRoutes = () => {
  const { session, setSession } = useSessionStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
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

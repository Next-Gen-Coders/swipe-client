import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router";

interface SessionState {
  session: Session | null;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
    set({ session: null });
    window.location.replace("/");
  },
}));

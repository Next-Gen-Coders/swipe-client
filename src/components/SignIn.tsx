import { supabase } from "../../supabaseClient";

import CtaButton from "./CtaButton";

const SignIn = () => {
  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div>
    <CtaButton
      onClick={signUp}
    >
      Continue with with Google
    </CtaButton>
    </div>
  );
};

export default SignIn;

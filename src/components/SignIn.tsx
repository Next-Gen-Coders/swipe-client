import { supabase } from "../../supabaseClient";

import CtaButton from "./CtaButton";

const SignIn = () => {
  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <CtaButton
      onClick={signUp}
      title="Sign In"
    >
      Let's Go!
    </CtaButton>
  );
};

export default SignIn;

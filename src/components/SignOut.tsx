import { useSessionStore } from "../stores/sessionStore";

const SignOut = () => {
  const { signOut } = useSessionStore();

  return (
    <button
      onClick={signOut}
      className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200"
    >
      Sign out
    </button>
  );
};

export default SignOut;

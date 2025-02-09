import { useSessionStore } from "../stores/sessionStore";

const SignOut = () => {
  const { signOut } = useSessionStore();

  return (
    <button
      onClick={signOut}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors duration-200 font-semibold"
    >
      Sign out
    </button>
  );
};

export default SignOut;

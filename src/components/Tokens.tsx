import { useTokens } from "../hooks/apis/useTokens";

const Tokens = () => {
  const { data, isLoading, error } = useTokens();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>{data?.map((token) => <div key={token.id}>{token.name}</div>)}</div>
  );
};

export default Tokens;

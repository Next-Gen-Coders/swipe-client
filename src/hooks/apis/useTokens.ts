import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/config/axiosClient";

interface Tokens {
  id: string;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  chainId: number;
}

export const useTokens = () => {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: async () => {
      const { data } = await apiClient.get<Tokens[]>("/tokens");
      return data;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/config/axiosClient";

export const useGetSwipeCards = (email: string) => {
  return useQuery({
    queryKey: ["swipe-cards", email],
    queryFn: async () => {
      if (!email) throw new Error("Email is required");

      const { data } = await apiClient.post("/user/get-swipe-cards", { email });
      return data.data;
    },
    enabled: !!email,
  });
};

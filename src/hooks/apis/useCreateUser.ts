import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/config/axiosClient";
import { Session } from "@supabase/supabase-js";

interface CreateUserDto {
  name: string | undefined;
  email: string | undefined;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (session: Session) => {
      const userData: CreateUserDto = {
        name: session.user?.user_metadata?.name,
        email: session.user?.email,
      };

      const { data } = await apiClient.post("/users", userData);
      return data;
    },
  });
};

// Implementation

// createUserMutation.mutate(session, {
//     onError: (error) => {
//       console.error("Error creating user:", error);
//     },
//   });

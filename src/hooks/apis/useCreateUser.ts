import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/config/axiosClient";
import { Session } from "@supabase/supabase-js";

import { RiskToleranceLevel } from "@/utils/Types";

interface CreateUserDto {
  name: string | undefined;
  email: string | undefined;
  riskTolerance: RiskToleranceLevel;
  cryptoExp: number;
}

interface CreateUserVars {
  session: Session;
  riskTolerance: RiskToleranceLevel;
  cryptoExperience: number;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async ({
      session,
      riskTolerance,
      cryptoExperience,
    }: CreateUserVars) => {
      const userData: CreateUserDto = {
        name: session.user?.user_metadata?.name,
        email: session.user?.email,
        riskTolerance,
        cryptoExp: cryptoExperience,
      };

      const { data } = await apiClient.post("/user/create", userData);
      return data;
    },
  });
};

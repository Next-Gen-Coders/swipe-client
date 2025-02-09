import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserSettingsState {
  onboardingCompleted: boolean;
  setOnboardingCompleted: (onboardingCompleted: boolean) => void;
}

export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set) => ({
      onboardingCompleted: false,
      setOnboardingCompleted: (onboardingCompleted) =>
        set({ onboardingCompleted }),
    }),
    {
      name: "user-settings",
      partialize: (state) => ({
        onboardingCompleted: state.onboardingCompleted,
      }),
    },
  ),
);

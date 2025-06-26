import { create } from "zustand";

type PasswordState = {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
  generatedPassword: string;

  setLength: (length: number) => void;
  toggleNumbers: () => void;
  toggleSymbols: () => void;
  toggleUppercase: () => void;
  toggleLowercase: () => void;
  generatePassword: () => void;
};

const usePasswordStore = create<PasswordState>((set) => ({
  // state variables
  length: 12,
  includeNumbers: true,
  includeSymbols: false,
  includeUppercase: true,
  includeLowercase: true,
  generatedPassword: "",

  // action methods
  setLength: (length) => set({ length }),
  toggleNumbers: () =>
    set((state) => ({ includeNumbers: !state.includeNumbers })),
  toggleSymbols: () =>
    set((state) => ({ includeSymbols: !state.includeSymbols })),
  toggleLowercase: () =>
    set((state) => ({ includeLowercase: !state.includeLowercase })),
  toggleUppercase: () =>
    set((state) => ({ includeUppercase: !state.includeUppercase })),
  generatePassword: () =>
    set((state) => {
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      let characters = "";

      if (state.includeNumbers) characters += numbers;
      if (state.includeSymbols) characters += symbols;
      if (state.includeUppercase) characters += uppercase;
      if (state.includeLowercase) characters += lowercase;

      let password = "";

      for (let i = 0; i < state.length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }
      // Save to sessionStorage
      sessionStorage.setItem("generatedPassword", password);
      return { generatedPassword: password };
    }),
}));

export default usePasswordStore;

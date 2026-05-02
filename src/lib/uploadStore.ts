import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProcessedImage } from "./services/backgroundRemoval";

type UploadStore = {
  history: ProcessedImage[];
  addUpload: (image: ProcessedImage) => void;
  clear: () => void;
};

export const useUploadStore = create<UploadStore>()(
  persist(
    (set) => ({
      history: [],
      addUpload: (image) =>
        set((s) => ({ history: [image, ...s.history].slice(0, 30) })),
      clear: () => set({ history: [] }),
    }),
    { name: "snapcut.uploads" },
  ),
);

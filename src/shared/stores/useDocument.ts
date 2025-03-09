import { create } from 'zustand';
import deepDiff from 'deep-diff';
import { parseHtmlToArray } from "@/utils/parseHtmlToArray";

interface RefineState {
  preDocument: string[];
  initDocument: (newDocument: string[]) => void;
  updateDocument: (Document: string) => void;
}

export const useDocument = create<RefineState>((set) => ({
  preDocument: [],
  initDocument: (newDocument : string[]) => set({ preDocument: newDocument }),
  updateDocument: (document: string) => set((state) => {
    const newDocument = parseHtmlToArray(document);
    const difference = deepDiff.diff(state.preDocument, newDocument);
    if (difference === undefined) return state;
    console.log('Difference:', difference);
    console.log('Document:', newDocument);
    return { preDocument: newDocument };
  }),
}));
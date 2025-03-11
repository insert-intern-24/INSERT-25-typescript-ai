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
    const differences = deepDiff.diff(state.preDocument, newDocument);
    if (differences === undefined) return state;
    
    const modifiedOrAddedIndices = differences.map(diff => {
      if ((diff.kind === 'E' || diff.kind === 'N') && diff.path) {
        return diff.path[0];
      }
      if (diff.kind === 'A') {
        return diff.index;
      }
      return undefined;
    }).filter(index => index !== undefined);
    
    const uniqueIndices = [...new Set(modifiedOrAddedIndices)];
    
    console.log('Difference:', differences);
    console.log('Modified/Added indices:', uniqueIndices);
    console.log('Document:', newDocument);
    return { preDocument: newDocument };
  }),
}));
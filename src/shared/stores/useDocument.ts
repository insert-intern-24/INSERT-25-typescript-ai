import { create } from 'zustand';
import deepDiff from 'deep-diff';
import { parseHtmlToArray } from "@/utils/parseHtmlToArray";
import { on } from 'events';

interface RefineState {
  preDocument: string[];
  initDocument: (newDocument: string[]) => void;
  updateDocument: (Document: string) => void;
  onProcessing : boolean;
}

export const useDocument = create<RefineState>((set) => ({
  onProcessing: false,
  preDocument: [],
  initDocument: (newDocument : string[]) => set({ preDocument: newDocument }),
  updateDocument: (document: string) => set((state) => {
    if (state.onProcessing) return state;
    state.onProcessing = true;

    // HTML 문자열을 배열로 변환
    const newDocument = parseHtmlToArray(document);

    // 이전 문서와 새로운 문서를 비교하여 변경된 요소를 찾음
    const differences = deepDiff.diff(state.preDocument, newDocument);

    // 변경된 요소가 없으면 상태를 그대로 반환
    if (differences === undefined) return state;
    
    // 변경된 요소의 인덱스를 찾음
    const modifiedOrAddedIndices = differences.map(diff => {
      if ((diff.kind === 'E' || diff.kind === 'N') && diff.path) {
        return diff.path[0];
      }
      if (diff.kind === 'A') {
        return diff.index;
      }
      return undefined;
    }).filter(index => index !== undefined);
    
    // 중복된 인덱스를 제거
    const uniqueIndices = [...new Set(modifiedOrAddedIndices)];

    // 변경된 요소를 추출
    const modifiedElements = uniqueIndices.map(index => newDocument[index as number]);

    console.log(modifiedElements);
    state.onProcessing = false;
    return { preDocument: newDocument };
  }),
}));
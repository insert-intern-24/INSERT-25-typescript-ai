import { create } from 'zustand';
import { diff } from 'deep-diff';
import { grantIdToHtml } from "@/utils/grantIdToHtml";

interface RefineState {
  preValue: string[];
  virtualDocument: string[];
  setValue: (newValue: string[]) => void;
  update: (value: string) => void;
}

const updateRefine = (value: string) => (state: RefineState) => {
  state.virtualDocument = grantIdToHtml(value)
  // console.log(state.preValue);
  // console.log(value);
  const difference = diff(state.preValue, value);
  // console.log('Difference:', difference);
  // const editedDifference = difference.filter(d => d.kind === "E").map(d => d.path);
  // console.log'(editedDifference);
  return ({ preValue: state.virtualDocument });
};

export const useDiff = create<RefineState>((set) => ({
  preValue: [],
  virtualDocument: [],
  setValue: (newValue : string[]) => set({ preValue: newValue }),
  update: (value: string) => set(updateRefine(value)),
}));

// 트리거 : 입력이 n초 동안 감지되지 않으면.
// 데이터가 추가되거나 변경되었을 때 -> 다듬음 요청, 시간 걸어야할듯
// 데이터가 삭제되었을 떄 -> 다듬기 추천 리스트에서 제거
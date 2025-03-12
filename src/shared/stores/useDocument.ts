import { create } from "zustand";
import deepDiff from "deep-diff";
import { parseHtmlToArray } from "@/utils/parseHtmlToArray";
import generateUniqueId from "@/utils/generateUniqueId";
import replaceSubstring from "@/utils/replaceSubstring";

interface ErrorDetail {
  code: number;
  origin_word: string;
  refine_word: string[];
  index: number;
}

interface ErrorData {
  target_id: string;
  error: ErrorDetail[];
}

interface Errors extends ErrorData {
  error_id: string;
}

interface RefineState {
  preDocument: string[];
  initDocument: (newDocument: string) => void;
  updateDocument: (documentContext: string, editorRef) => void;
  onProcessing: boolean;
  errors: Errors[];
  appendErrors: (newErrors: ErrorData[]) => void;
  choiceError: string;
  setChoiceError: (error_id: string) => void;
}

const allowedHtmlTags = [
  // 기본 텍스트 태그
  "p",
  "span",
  "br",
  "hr",

  // 제목 태그
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",

  // 강조 및 스타일 태그
  "b",
  "strong",
  "i",
  "em",
  "u",
  "mark",
  "small",
  "del",
  "ins",
  "sub",
  "sup",

  // 인용 및 코드 관련 태그
  "blockquote",
  "q",
  "cite",
  "code",
  "pre",
  "kbd",
  "samp",
  "var",

  // 목록 관련 태그
  "li",
  "dt",
  "dd",

  // 테이블 관련 태그
  "th",
  "td",
  "caption",

  // 폼 요소 (입력 가능)
  "textarea",
  "input",
  "button",
];

export const useDocument = create<RefineState>((set) => ({
  onProcessing: false,
  preDocument: [],
  initDocument: (newDocument: string) => set({ preDocument: parseHtmlToArray(newDocument) }),
  updateDocument: (documentContext: string, editorRef) =>
    set((state) => {
      if (state.onProcessing) return state;
      state.onProcessing = true;

      // HTML 문자열을 배열로 변환
      let newDocument = parseHtmlToArray(documentContext);

      // &nbsp;가 포함된 요소는 제거
      newDocument = newDocument.filter((element) => !element.includes("&nbsp;"));

      // allowedHtmlTags에 포함되는 태그만 필터링
      newDocument = newDocument.filter((element) => {
        const tag = element.replace(/<(\w+)[^>]*>.*<\/\1>|<(\w+)[^>]*\/>/g, "$1$2").trim();
        return allowedHtmlTags.includes(tag);
      });
      // 이전 문서와 새로운 문서를 비교하여 변경된 요소를 찾음
      let differences = deepDiff.diff(state.preDocument, newDocument);

      // differences에서 undefined인 요소를 제거
      differences = differences?.filter((diff) => diff !== undefined);
      // 변경된 요소가 없으면 상태를 그대로 반환
      if (differences === undefined) {
        state.onProcessing = false;
        return state;
      }

      // 변경된 요소의 인덱스를 찾음
      const modifiedOrAddedIndices = differences
        .map((diff) => {
          if ((diff.kind === "E" || diff.kind === "N") && diff.path) {
            return diff.path[0];
          }
          if (diff.kind === "A") {
            return diff.index;
          }
          return undefined;
        })
        .filter((index) => index !== undefined);

      // 중복된 인덱스를 제거
      const uniqueIndices = [...new Set(modifiedOrAddedIndices)];

      // 변경된 요소를 추출
      const modifiedElements = uniqueIndices.map((index) => newDocument[index as number]);

      console.log(modifiedElements);
      fetch(`${import.meta.env.VITE_AI_API_URL}/ai/refine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: '<p data-unique="e-0">http</p>',
          content: modifiedElements,
        }),
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(editorRef.current.getData());
          console.log("Success:", data);
          state.appendErrors(data);
          console.log("errors:", state.errors);
          return ErrorToBinding(data);
        })
        .then((data) => {
          console.log(editorRef);
          editorRef.current.setData(data.querySelector(".ck-content")?.innerHTML as string);
          // editorRef.current.setData(`<p data-placeholder="Type or paste your content here!" class="ck-placeholder" data-unique="unique-fm2basrqd">오늘날 <span id="error-wip7wyk2x" class="__origin_word__">딥페이크</span> 범죄가 증가하는 추세이다.</p>`);
          set({ onProcessing: false });
        })
        .catch((error) => {
          console.error("Error:", error);
          set({ onProcessing: false });
        });
      return { preDocument: newDocument };
    }),
  errors: [],
  appendErrors: (newErrors: ErrorData[]) =>
    set((state) => ({
      errors: [
        ...state.errors,
        ...newErrors.map((value) => ({ ...value, error_id: generateUniqueId("error-") })),
      ],
    })),
  choiceError: "",
  setChoiceError: (error_id: string) => set({ choiceError: error_id }),
}));

async function ErrorToBinding(data: ErrorData[]) {
  const document2 = document.cloneNode(true) as Document;
  await data.map((errorData) => {
    const target_id = errorData.target_id;
    const target_element = document2.querySelector(`[data-unique="${target_id}"]`);

    if (!target_element) return null;
    let currentHTML = target_element.innerHTML;

    const errorIndices = errorData.error
      .map((errorDetail) => errorDetail.index)
      .sort((a, b) => a - b);

    let additionalIndex = 0;
    errorIndices.forEach((index) => {
      const errorDetail = errorData.error.find((detail) => detail.index === index);
      if (errorDetail) {
        const { origin_word } = errorDetail;
        if (
          currentHTML.slice(
            index + additionalIndex,
            index + additionalIndex + origin_word.length
          ) === origin_word
        ) {
          const random_id = generateUniqueId("error-");
          const define_span = `<span id="${random_id}" class="__origin_word__">${origin_word}</span>`;
          currentHTML = replaceSubstring(
            currentHTML,
            index + additionalIndex,
            index + additionalIndex + origin_word.length,
            define_span
          );
          additionalIndex += define_span.length - origin_word.length;
          console.log(currentHTML);
        }
      }
    });
    target_element.innerHTML = currentHTML;
    return target_element;
  });
  return document2;
}

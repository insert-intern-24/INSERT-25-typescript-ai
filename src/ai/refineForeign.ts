import { findForeignWord } from "../../tmp/ai/lstm/findForeignWord";
import { dify } from "../../tmp/ai/dify/dify";

interface refineResponseType {
  target_id: string;
  errors: {
    code: number;
    origin_word: string;
    refine_word: string[];
    index: number;
  }[];
}

export interface foreignSentenceType {
  target_id: string;
  sentence: string;
  foreignWord: string[];
  fullSentence: string;
}

export async function* refineForeign(inputData: string[]) {
  const foreignSentenceList: foreignSentenceType[] = [];

  for (const html of inputData) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const content = doc.body.textContent || "";
    const target_id = doc.body.querySelector("p")?.getAttribute("data-unique") as string;

    const { foreignWords, sentenceList } = await findForeignWord(content);

    for (const sentence of sentenceList) {
      const foreignInSentence = foreignWords.filter((word) => sentence.includes(word));

      if (foreignInSentence.length) {
        foreignSentenceList.push({
          target_id,
          sentence,
          foreignWord: foreignInSentence,
          fullSentence: content
        });
      }
    }
  }

  const pending = new Set<Promise<{ response: refineResponseType }>>();

  foreignSentenceList.forEach((foreignSentence) => {
    const p = dify(foreignSentence).then((difyResponse) => ({
      response: {
        target_id: difyResponse.target_id,
        errors: Object.entries(difyResponse.refineWord).map(([origin_word, refine_word]) => ({
          code: 1,
          origin_word,
          refine_word,
          index: foreignSentence.fullSentence.indexOf(origin_word)
        }))
      }
    }));
    pending.add(p);
  });

  while (pending.size > 0) {
    const finished = await Promise.race(pending);

    for (const p of pending) {
      p.then((data) => {
        if (data === finished) {
          pending.delete(p);
        }
      });
    }

    yield finished.response;
  }
}

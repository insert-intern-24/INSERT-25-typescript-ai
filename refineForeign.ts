import { findForeignWord } from "./lstm/findForeignWord";
import { dify } from "./dify/dify";

interface refineResponseType {
  target_id: string;
  error:
    {
      code: number,
      origin_word: string,
      refine_word: string[],
      index: number
    }[];
}

export interface foreignSentenceType {
  sentence: string;
  foreignWord: string[];
}

export const refineForeign = async (inputData: string[]): Promise<refineResponseType[]> => {
  const refineResponse: refineResponseType[] = [];

  for (const html of inputData) {
    const foreignSentenceList: foreignSentenceType[] = [];
    let parsedText: string = "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const content = doc.body.textContent;
    parsedText = content || "";

    const { foreignWords, sentenceList } = await findForeignWord(parsedText);

    for (const sentence of sentenceList) {
      let foreignSentence: foreignSentenceType | null = null;
      
      const foreignInSentence = foreignWords.filter((foreignWord) => {
        if (sentence.includes(foreignWord)) {
          return true
        } 

        return false
      })

      if (foreignInSentence.length) {
        foreignSentence = {
          sentence: sentence,
          foreignWord: foreignInSentence
        }
      }

      if (foreignSentence) foreignSentenceList.push(foreignSentence)
    }

    const response = await dify(foreignSentenceList);

    refineResponse.push({
      target_id: doc.body.querySelector("p")?.getAttribute("data-unique") as string,
      error: Object.entries(response).map((data) => {
        return {
          code: 1,
          origin_word: data[0],
          refine_word: data[1],
          index: content?.indexOf(data[0]) as number
        }
      })
    })
  }

  return refineResponse;
}
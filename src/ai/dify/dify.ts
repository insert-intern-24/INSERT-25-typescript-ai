import axios from "axios"
import { foreignSentenceType } from "../refineForeign";

export const dify = async (foreignSentenceList: foreignSentenceType[]): Promise<Record<string, string[]>> => {
  const URL = import.meta.env.VITE_DIFY_ADDRESS;
  const API_KEY = import.meta.env.VITE_DIFY_KEY;

  const result: Record<string, string[]> = {};

  for (const foreignSentence of foreignSentenceList) {
    const foreignWords = foreignSentence.foreignWord.join(", ");

    const response = await axios.post(`${URL}/workflows/run`,
      {
        inputs: {
          foreign_words: foreignWords,
          text_to_replace: foreignSentence.sentence
        },
        response_mode: "blocking",
        user: "asdfasdf-123"
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    const responseText = response.data.data.outputs.text;
    const match = responseText.match(/\{[\s\S]*\}/);
    const parsedJson = JSON.parse(match[0]);

    Object.assign(result, parsedJson)
  }

  return result;
}
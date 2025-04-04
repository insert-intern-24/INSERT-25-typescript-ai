import { useState } from "react";
import { refineForeign } from "./ai/refineForeign";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");


  return (
    <>
      <div>
        안녕하세요. 저희는 납득 가능한 외래어 순화 AI, 
        나랏말싸미를 개발한 FOUND 입니다.지금까지 진행된 계획부터 말씀드리겠습니다. 
        저희는 외래어 구별 모델을 개발하였으며 사용자 중심의 순화어 데이터를 수집 및 정리하였고, 
        효율적인 우리말 순화 모델을 개발하였습니다. 마지막으로 이 모든 것들을 API 화 하여 웹에 적용시켰습니다.
        첫번째, 외래어 구별 모델 개발입니다.1월에는 데이터 수집, 2월에는 LSTM 모델 개발을 계획했었습니다.
        실제로도 1월달에 우리말샘에서 데이터를 수집하였으며, 
        오히려 LSTM 모델을 1월부터 개발하여 2월 3월엔 계속하여 데이터를 수집하고 추가 학습시키고 있습니다.
      </div>
      <input 
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      />
      <button
        onClick={async () => {
          setIsLoading(true);
          setSeconds(0);

          const start = performance.now();
          const timer = setInterval(() => {
            const elapsed = (performance.now() - start) / 1000;
            setSeconds(parseFloat(elapsed.toFixed(1)));
          }, 100);

          const response = await refineForeign([
            `<p data-unique='e-1'>${content}</p>`
          ]);

          clearInterval(timer);
          setIsLoading(false);
          console.log(response);
          setContent("");
        }}
      >
        Refine
      </button>

      {isLoading && <p>{seconds}초 경과 중...</p>}
    </>
  );

}

export default App
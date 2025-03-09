import React from "react";
import styled from "styled-components";

export default function TabsBlock() {
  const tabs = [
    { id: 1, title: "다듬을 단어", value: 14 },
    { id: 2, title: "목표 설정", value: 0 },
    { id: 3, title: "종합 점수", value: 40 },
  ];
  return (
    <>
      <TabsBlockBox>
        {tabs.map((tab) => (
          <BlockBox key={tab.id} isFirst={tab.id === 1}>
            <Content>
              2<Text>{tab.title}</Text>
              {tab.value > 0 && (
                <Value isValue={tab.value === 40}>
                  <ValueText>{tab.value}</ValueText>
                </Value>
              )}
            </Content>
          </BlockBox>
        ))}
      </TabsBlockBox>
    </>
  );
}

const TabsBlockBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: -1px;
`;

const BlockBox = styled.div<{ isFirst: boolean }>`
  display: flex;
  min-height: 42px;
  padding: 10px 20px;
  align-items: center;
  gap: 5px;
  border: 1px solid var(--border-color, #e2e2e2);
  background: ${(props) => (props.isFirst ? "#f3f6f3" : "#fff")};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Text = styled.span`
  color: var(--text-color, #2b2b2b);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 165%;
`;
const Value = styled.div<{ isValue: boolean }>`
  display: flex;
  min-width: 25px;
  padding: 2px 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background: ${(props) => (props.isValue ? "#D7860D" : "#05a569")};
  box-shadow: 0px 4px 41.2px 0px rgba(5, 165, 105, 0.05);
`;
const ValueText = styled.span`
  color: #fff;
  font-family: "Noto Sans KR";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
`;

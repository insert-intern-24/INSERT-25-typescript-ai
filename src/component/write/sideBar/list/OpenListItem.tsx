import React, { useState } from "react";
import styled from "styled-components";
import line from "../../../../../public/images/icon/line.svg";
import ListItem from "./ListItem";
import RefinedItem from "./RefinedItem";

export default function OpenListItem() {
  const [isRefined, setIsRefined] = useState(false);

  const handleRefineClick = () => {
    setIsRefined(true);
  };

  return (
    <>
      <OpenListItemBox>
        <Line src={line} alt="line" />
        <OpenListBox>
          {isRefined ? <RefinedItem /> : <ListItem />}
          <RefineBox>
            <RefineTest>
              <DeleteText></DeleteText>
              <RefinedText></RefinedText>
            </RefineTest>
            <Buttons>
              <RefineButton onClick={handleRefineClick}>
                <RefineButtonText>다듬기</RefineButtonText>
              </RefineButton>
              <RefusalButton>
                <RefusalButtonText>거절하기</RefusalButtonText>
              </RefusalButton>
            </Buttons>
          </RefineBox>
        </OpenListBox>
      </OpenListItemBox>
    </>
  );
}

const OpenListItemBox = styled.div`
  display: flex;
  min-width: 480px;
  min-height: 130px;
  padding: 10px 6px 10px 10px;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid var(--border-color, #e2e2e2);
  background: #fff;
`;

const Line = styled.img`
  width: 0px;
  min-height: 108.5px;
  flex-shrink: 0;
  stroke-width: 4px;
  stroke: var(--border-color, #e2e2e2);
`;

const OpenListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

const RefineBox = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #f8fbfc;
`;

const RefineTest = styled.span`
  color: var(--text-color, #2b2b2b);
  font-family: "Noto Sans KR";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const DeleteText = styled(RefineTest)`
  color: var(--description-color, #afb1c3);
  text-decoration-line: strikethrough;
`;

const RefinedText = styled(RefineTest)`
  color: var(--primary-color, #05a569);
`;

const Buttons = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

const RefineButton = styled.button`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: var(--primary-color, #05a569);
`;

const RefineButtonText = styled.span`
  color: #fff;
  font-family: "Noto Sans KR";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 19.2px;
`;

const RefusalButton = styled(RefineButton)`
  background: #fff;
`;

const RefusalButtonText = styled(RefineButtonText)`
  color: var(--description-color, #afb1c3);
`;

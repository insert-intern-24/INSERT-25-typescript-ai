import styled from "styled-components";
import line from "/public/images/icon/line.svg";
import loanword from "/public/images/icon/loanword.svg";
import * as All from "./ErrorListItem";

interface OpenListItemProps {
  default: string;
  refine: string;
  description: string;
}

export default function OpenListItem({
  default: def,
  refine,
  description,
}: OpenListItemProps) {
  return (
    <>
      <OpenListItemBox>
        <Line src={line} alt="line" />
        <OpenListBox>
          <All.ListItemBox>
            <All.ListContentBox>
              <All.Loanword src={loanword} alt="loanword" />
              <All.ContextBox>
                <All.Description>{description}</All.Description>
                <All.Text>
                  {def} → <RefinedText>{refine}</RefinedText>
                </All.Text>
              </All.ContextBox>
            </All.ListContentBox>
          </All.ListItemBox>
          <RefineBox>
            <RefineTest>나는 이 일을</RefineTest>
            <DeleteText>{def}</DeleteText>
            <RefinedText>
              {refine}
              <RefineTest>할 수 있어</RefineTest>
            </RefinedText>
          </RefineBox>
          <Buttons>
            <RefineButton>
              <RefineButtonText>다듬기</RefineButtonText>
            </RefineButton>
            <RefusalButton>
              <RefusalButtonText>거절하기</RefusalButtonText>
            </RefusalButton>
          </Buttons>
        </OpenListBox>
      </OpenListItemBox>
    </>
  );
}

const OpenListItemBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px 6px 10px 10px;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px #e2e2e2;
  background: #fff;
`;

const OpenListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

const Line = styled.img`
  width: 4px;
  height: 100%;
  user-select: none;
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
  color: #2b2b2b;
  font-family: "Noto Sans KR";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const DeleteText = styled(RefineTest)`
  color: #afb1c3;
  text-decoration: line-through;
`;

const RefinedText = styled(RefineTest)`
  color: #05a569;
`;

const Buttons = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  user-select: none;
`;

const RefineButton = styled.button`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #05a569;
  border: none;
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
  color: #afb1c3;
`;

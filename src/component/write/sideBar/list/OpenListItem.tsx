import styled from "styled-components";
import line from "../../../../../public/images/icon/line.svg";
import loanword from "../../../../../public/images/icon/loanword.svg";

export default function OpenListItem() {
  return (
    <>
      <OpenListItemBox>
        <Line src={line} alt="line" />
        <OpenListBox>
          <ListItemBox>
            <ListContentBox>
              <Loanword src={loanword} alt="loanword" />
              <ContextBox>
                <Description>외래어 직역 표현</Description>
                <Text>
                  핸들링 → <RefinedText>처리</RefinedText>
                </Text>
              </ContextBox>
            </ListContentBox>
          </ListItemBox>
          <RefineBox>
            <RefineTest>나는 이 일을</RefineTest>
            <DeleteText>핸들링</DeleteText>
            <RefinedText>처리</RefinedText>
            <RefineTest>할 수 있어</RefineTest>
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
  min-width: 480px;
  min-height: 130px;
  padding: 10px 6px 10px 10px;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid var(--border-color, #e2e2e2);
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
  text-decoration: line-through;
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
  color: var(--description-color, #afb1c3);
`;

const ListItemBox = styled.div`
  display: flex;
  min-width: 480px;
  padding: 10px 6px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid var(--border-color, #e2e2e2);
  background: #fff;
`;

const ListContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const ContextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const Description = styled.span`
  color: var(--description-color, #afb1c3);
  font-family: "Noto Sans KR";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Text = styled.span`
  color: var(--text-color, #2b2b2b);
  font-family: "Noto Sans KR";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Loanword = styled.img`
  width: 26px;
  height: 26px;
`;

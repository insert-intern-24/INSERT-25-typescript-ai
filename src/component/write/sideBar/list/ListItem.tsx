import React from "react";
import loanword from "../../../../../public/images/icon/loanword.svg";
import styled from "styled-components";

export default function ListItem() {
  return (
    <>
      <ListItemBox>
        <ListContentBox>
          <Loanword src={loanword} alt="loanword" />
          <ContextBox>
            <Description>불필요한 줄임말 외래어 사용</Description>
            <Text>노잼</Text>
          </ContextBox>
        </ListContentBox>
      </ListItemBox>
    </>
  );
}
const ListItemBox = styled.div`
  display: flex;
  min-width: 480px;
  padding: 10px 6px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e2e2e2;
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
  color: #afb1c3;
  font-family: "Noto Sans KR";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Text = styled.span`
  color: #2b2b2b;
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

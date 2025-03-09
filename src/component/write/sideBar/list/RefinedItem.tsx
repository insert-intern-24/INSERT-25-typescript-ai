import React from "react";
import styled from "styled-components";
import success from "../../../../../public/images/icon/success.svg";

export default function RefinedItem() {
  return (
    <>
      <RefinedItemBox>
        <ListContentBox>
          <Success src={success} alt="success" />
          <ContextBox>
            <Description>수정한 단어</Description>
            <Text>
              노잼 → <RefinedText>재미가 없는, 흥미가 퇴색된</RefinedText>
            </Text>
          </ContextBox>
        </ListContentBox>
      </RefinedItemBox>
    </>
  );
}

const RefinedItemBox = styled.div`
  display: flex;
  min-width: 480px;
  padding: 10px 6px 10px 10px;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid #e2e2e2;
  background: #fff;
`;

const ListContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const ContextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: 100%;
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

const RefinedText = styled(Text)`
  color: #05a569;
`;

const Success = styled.img`
  width: 26px;
  height: 26px;
  user-select: none;
`;

import styled from "styled-components";
import success from "/public/images/icon/success.svg";
import * as All from "./ListItem";

export default function RefinedItem() {
  return (
    <>
      <RefinedItemBox>
        <ListContentBox>
          <Success src={success} alt="success" />
          <All.ContextBox>
            <All.Description>수정한 단어</All.Description>
            <All.Text>
              노잼 → <RefinedText>재미가 없는, 흥미가 퇴색된</RefinedText>
            </All.Text>
          </All.ContextBox>
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
`;

const RefinedText = styled(All.Text)`
  color: #05a569;
`;

const Success = styled.img`
  width: 26px;
  height: 26px;
  user-select: none;
`;

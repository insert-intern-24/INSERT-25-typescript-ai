import error from "/public/images/icon/loanword.svg";
import styled from "styled-components";

interface ListItemProps {
  origin_word: string;
  refined_word: string;
  description: string;
}

const ListItem = ({origin_word, refined_word, description}: ListItemProps) => {
  return (
    <ListItemBox>
      <ListItemContent>
        <Symbol src={error} alt="error"/>
        <ContextBox>
          <Description>{description}</Description>
          <Text>{origin_word} → <Green>{refined_word}</Green></Text>
        </ContextBox>
      </ListItemContent>
    </ListItemBox>
  )
}

export default ListItem

const ListItemBox = styled.article`
  display: flex;
  width: 100%;
  padding: 10px 6px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e2e2e2;
  background: #fff;
`

const ListItemContent = styled.div`
  display: flex;
  gap: 12px;
`

export const Symbol = styled.img`
  width: 26px;
  height: 26px;
  user-select: none;
`;

export const ContextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Description = styled.span`
  color: #afb1c3;
  font-family: "Noto Sans KR";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Text = styled.span`
  color: #2b2b2b;
  font-family: "Noto Sans KR";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Green = styled.span`
  color: #05A569;
`
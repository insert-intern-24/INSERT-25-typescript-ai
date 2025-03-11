import styled from "styled-components";
import TabsBlock from "./tabs/TabsBlock";
import ListItem from "./list/ErrorListItem";
import OpenListItem from "./list/OpenListItem";
import RefinedItem from "./list/RefinedItem";

const word = [
  {
    default: "핸들링",
    refine: "처리",
    description: "외래어 직역 표현",
  },
  {
    default: "노잼",
    refine: "재미가 없는, 흥미가 퇴색된",
    description: "불필요한 줄임말 외래어 사용",
  },
];
export default function SideBar() {
  return (
    <>
      <SideBarBox>
        <TabsBlock />
        <ListItem default={word[1].default} description={word[1].description} />
        <OpenListItem
          default={word[0].default}
          refine={word[0].refine}
          description={word[0].description}
        />
        <RefinedItem default={word[1].default} refine={word[1].refine} />
      </SideBarBox>
    </>
  );
}

const SideBarBox = styled.div`
  width: 100%;
  max-width: 30dvw;
  max-height: 100%;
  border-left: 1px solid #e2e2e2;
  background: #fff;
`;

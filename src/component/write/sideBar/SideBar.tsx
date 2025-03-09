import styled from "styled-components";
import TabsBlock from "./tabs/TabsBlock";
import ListItem from "./list/ListItem";
import OpenListItem from "./list/OpenListItem";
import RefinedItem from "./list/RefinedItem";

export default function SideBar() {
  return (
    <>
      <SideBarBox>
        <TabsBlock />
        <ListItem />
        <OpenListItem />
        <RefinedItem />
      </SideBarBox>
    </>
  );
}

const SideBarBox = styled.div`
  min-width: 500px;
  min-height: 1003px;
  flex-shrink: 0;
  border-left: 1px solid #e2e2e2;
  background: #fff;
`;

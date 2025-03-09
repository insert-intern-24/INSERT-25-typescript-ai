import React, { useState } from "react";
import styled from "styled-components";
import TabsBlock from "./tabs/TabsBlock";
import ListItem from "./list/ListItem";
import OpenListItem from "./list/OpenListItem";

export default function SideBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <>
      <SideBarBox>
        <TabsBlock />
        {[...Array(6)].map((_, index) => (
          <div key={index} onClick={() => handleItemClick(index)}>
            {openIndex === index ? <OpenListItem /> : <ListItem />}
          </div>
        ))}
      </SideBarBox>
    </>
  );
}

const SideBarBox = styled.div`
  min-width: 500px;
  min-height: 1003px;
  flex-shrink: 0;
  border-left: 1px solid var(--border-color, #e2e2e2);
  background: #fff;
`;

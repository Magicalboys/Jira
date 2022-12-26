import React from "react";
import { useDocumentTitle } from "../../utils";
import { useKanbans } from "./../../utils/kanban";
import { useKanbanSearchParams, useProjectInurl } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-pannel";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInurl();

  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </div>
  );
};
const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 4rem;
`;

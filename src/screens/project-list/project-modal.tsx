import React from "react";

import { Drawer, Button } from "antd";
import { useProjectsModel } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectsModel();

  return (
    <Drawer onClose={close} open={projectModalOpen} width={"100%"}>
      <h1>Project Model</h1>
      <Button onClick={close}></Button>
    </Drawer>
  );
};

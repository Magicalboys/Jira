import React from "react";

import { Drawer, Button } from "antd";

export const ProjectModal = (props: {
  projectModealOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      open={props.projectModealOpen}
      width={"100%"}
    >
      <h1>Project Model</h1>
      <Button onClick={props.onClose}></Button>
    </Drawer>
  );
};

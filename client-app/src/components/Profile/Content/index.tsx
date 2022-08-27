import React, { FC } from "react";
import { SemanticShorthandItem, Tab, TabPaneProps } from "semantic-ui-react";

interface Pane {
  pane?: SemanticShorthandItem<TabPaneProps>;
  menuItem?: any;
  render?: (() => React.ReactNode) | undefined;
}

const ProfileContent: FC = () => {
  const panes: Pane[] = [
    { menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
    { menuItem: "Photos", render: () => <Tab.Pane>Photos Content</Tab.Pane> },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ];

  return (
    <Tab
      menu={{
        fluid: true,
        vertical: true,
      }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default ProfileContent;

import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { SemanticShorthandItem, Tab, TabPaneProps } from "semantic-ui-react";
import { Profile } from "types";
import ProfilePhotos from "../Photos";
import ProfileAbout from "../About";

interface Pane {
  pane?: SemanticShorthandItem<TabPaneProps>;
  menuItem?: any;
  render?: (() => React.ReactNode) | undefined;
}

interface Props {
  profile: Profile;
}

const ProfileContent: FC<Props> = ({ profile }) => {
  const panes: Pane[] = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
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

export default observer(ProfileContent);

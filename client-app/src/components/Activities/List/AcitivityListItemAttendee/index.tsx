import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Image, List } from "semantic-ui-react";

const ActivityListItemAttendee: FC = () => {
  return (
    <List horizontal>
      <List.Item>
        <Image size="mini" circular src="/assets/user.png" />
      </List.Item>
      <List.Item>
        <Image size="mini" circular src="/assets/user.png" />
      </List.Item>
      <List.Item>
        <Image size="mini" circular src="/assets/user.png" />
      </List.Item>
    </List>
  );
};

export default observer(ActivityListItemAttendee);

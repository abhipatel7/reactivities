import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";
import { Profile } from "types";

interface Props {
  attendees: Profile[];
}

const ActivityListItemAttendee: FC<Props> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map(({ username, image }) => (
        <List.Item key={username} as={Link} to={`/profiles/${username}`}>
          <Image size="mini" circular src={image ?? "/assets/user.png"} />
        </List.Item>
      ))}
    </List>
  );
};

export default observer(ActivityListItemAttendee);

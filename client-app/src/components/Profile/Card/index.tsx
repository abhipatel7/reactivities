import { truncate } from "common";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "types";

interface Props {
  profile: Profile;
}

const ProfileCard: FC<Props> = ({
  profile: { username, image, displayName, bio },
}) => {
  return (
    <Card as={Link} to={`profiles/${username}`}>
      <Image src={image ?? "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{displayName}</Card.Header>
        <Card.Description>{truncate(bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        20 followers
      </Card.Content>
    </Card>
  );
};

export default observer(ProfileCard);

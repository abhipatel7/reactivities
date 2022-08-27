import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Card, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "types";

interface Props {
  profile: Profile;
}

const ProfilePhotos: FC<Props> = ({ profile: { photos } }) => {
  return (
    <Tab.Pane>
      <Header icon="image" content="Photos" />
      <Card.Group itemsPerRow={5}>
        {photos?.map(({ id, url }) => (
          <Card key={id}>
            <Image src={url} />
          </Card>
        ))}
      </Card.Group>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);

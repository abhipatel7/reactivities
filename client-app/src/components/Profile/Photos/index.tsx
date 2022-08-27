import { PhotoUploadWidget } from "components/ImageUpload";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { useStore } from "stores";
import { Profile } from "types";

interface Props {
  profile: Profile;
}

const ProfilePhotos: FC<Props> = ({ profile: { photos } }) => {
  const {
    profileStore: { isCurrentUser },
  } = useStore();

  const [addPhoto, setAddPhoto] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhoto ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhoto(!addPhoto)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhoto ? (
            <PhotoUploadWidget />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos?.map(({ id, url }) => (
                <Card key={id}>
                  <Image src={url} />
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);

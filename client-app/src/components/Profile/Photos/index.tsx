import { PhotoUploadWidget } from "components/ImageUpload";
import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { useStore } from "stores";
import { Photo, Profile } from "types";

interface Props {
  profile: Profile;
}

const ProfilePhotos: FC<Props> = ({ profile: { photos } }) => {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      loading,
      setMainPhoto,
    },
  } = useStore();

  const [addPhoto, setAddPhoto] = useState(false);
  const [target, setTarget] = useState("");

  const handlerPhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhoto(false));
  };

  const handleSetMainPhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  };

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
            <PhotoUploadWidget
              uploadPhoto={handlerPhotoUpload}
              loading={uploading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={photo.id}
                        disabled={photo.isMain}
                        loading={target === photo.id && loading}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                      />
                      <Button basic color="red" icon="trash" />
                    </Button.Group>
                  )}
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

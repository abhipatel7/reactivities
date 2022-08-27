import { Loader, ProfileContent, ProfileHeader } from "components";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useStore } from "stores";

const Profile: FC = () => {
  const { username } = useParams<{ username: string }>();
  const {
    profileStore: { loadProfile, loadingProfile, profile },
  } = useStore();

  useEffect(() => {
    loadProfile(username);
  }, [loadProfile, username]);

  if (loadingProfile) return <Loader content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(Profile);

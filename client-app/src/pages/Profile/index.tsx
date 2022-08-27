import { ProfileContent, ProfileHeader } from "components";
import { FC } from "react";
import { Grid } from "semantic-ui-react";

const Profile: FC = () => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
};

export default Profile;

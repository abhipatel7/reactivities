import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "stores";
import {
  ActivityDetailsChat,
  ActivityDetailsHeader,
  ActivityDetailsInfo,
  ActivityDetailsSideBar,
  Loader,
} from "components";
import { useParams } from "react-router-dom";

const ActivityDetails: FC = () => {
  const {
    activityStore: { selectedActivity, loadActivityById, loadingInitial },
  } = useStore();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivityById(id);
  }, [id, loadActivityById]);

  if (loadingInitial || !selectedActivity) return <Loader />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={selectedActivity} />
        <ActivityDetailsInfo activity={selectedActivity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);

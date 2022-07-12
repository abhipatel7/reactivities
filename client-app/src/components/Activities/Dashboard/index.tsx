import { FC } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../types';
import ActivityDetails from '../Details';
import ActivityForm from '../Form';
import ActivityList from '../List';

interface Props {
  activities: Activity[];
}

const ActivityDashboard: FC<Props> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList activities={activities} />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {activities.length ? (
          <ActivityDetails activity={activities[0]} />
        ) : null}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;

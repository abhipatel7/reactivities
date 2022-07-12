import { FC } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../types';
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
    </Grid>
  );
};

export default ActivityDashboard;

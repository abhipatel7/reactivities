import { FC } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../types';
import ActivityDetails from '../Details';
import ActivityForm from '../Form';
import ActivityList from '../List';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  toggleSelectedActivity: (id: string) => void;
}

const ActivityDashboard: FC<Props> = ({
  activities,
  selectedActivity,
  toggleSelectedActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList
            activities={activities}
            toggleSelectedActivity={toggleSelectedActivity}
          />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity ? (
          <ActivityDetails
            activity={selectedActivity}
            toggleSelectedActivity={toggleSelectedActivity}
          />
        ) : null}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;

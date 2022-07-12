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
  isEdit: boolean;
  onFormOpen: (id: string) => void;
  onFormClose: () => void;
  onCreateOrEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
}

const ActivityDashboard: FC<Props> = ({
  activities,
  selectedActivity,
  toggleSelectedActivity,
  isEdit,
  onFormClose,
  onFormOpen,
  onCreateOrEditActivity,
  onDeleteActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList
            activities={activities}
            onFormClose={onFormClose}
            onDeleteActivity={onDeleteActivity}
            toggleSelectedActivity={toggleSelectedActivity}
          />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !isEdit ? (
          <ActivityDetails
            activity={selectedActivity}
            toggleSelectedActivity={toggleSelectedActivity}
            onFormOpen={onFormOpen}
          />
        ) : null}
        {isEdit && (
          <ActivityForm
            onCreateOrEditActivity={onCreateOrEditActivity}
            activity={selectedActivity}
            onFormClose={onFormClose}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;

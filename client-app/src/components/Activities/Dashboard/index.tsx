import { FC } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../types';
import ActivityDetails from '../Details';
import ActivityForm from '../Form';
import ActivityList from '../List';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  onSelectActivity: (id: string) => void;
  onCancelSelectedActivity: () => void;
  isEdit: boolean;
  onFormOpen: (id: string) => void;
  onFormClose: () => void;
  onCreateOrEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
  isSubmitting: boolean;
}

const ActivityDashboard: FC<Props> = ({
  activities,
  selectedActivity,
  onSelectActivity,
  onCancelSelectedActivity,
  isEdit,
  onFormClose,
  onFormOpen,
  onCreateOrEditActivity,
  onDeleteActivity,
  isSubmitting,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList
            activities={activities}
            onDeleteActivity={onDeleteActivity}
            onSelectActivity={onSelectActivity}
          />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !isEdit ? (
          <ActivityDetails
            activity={selectedActivity}
            onCancelSelectedActivity={onCancelSelectedActivity}
            onFormOpen={onFormOpen}
          />
        ) : null}
        {isEdit && (
          <ActivityForm
            onCreateOrEditActivity={onCreateOrEditActivity}
            activity={selectedActivity}
            onFormClose={onFormClose}
            isSubmitting={isSubmitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;

import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { useStore } from 'stores';
import { ActivityList, ActivityDetails, ActivityForm } from 'components';

const ActivityDashboard: FC = () => {
  const { activityStore } = useStore();
  const { selectedActivity, isEdit } = activityStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !isEdit && <ActivityDetails />}
        {isEdit && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { useStore } from 'stores';
import { ActivityFilters, ActivityList, Loader } from 'components';

const ActivityDashboard: FC = () => {
  const { activityStore } = useStore();

  const { loadActivities, loadingInitial, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size === 0) loadActivities();
  }, [activityRegistry, loadActivities]);

  if (loadingInitial) {
    return <Loader content="Loading App..." />;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);

import { FC, useEffect } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';
import { NavBar, ActivityDashboard, Loader } from 'components';

const App: FC = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.onLoadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loader content="Loading App..." />;
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  );
};

export default observer(App);

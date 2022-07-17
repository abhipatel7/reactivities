import { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavBar } from 'components';
import { Home, ActivityDashboard, ActivityDetails, ActivityForm } from 'pages';
import { Route, useLocation } from 'react-router-dom';

const App: FC = () => {
  const { key } = useLocation();

  return (
    <>
      <Route exact path="/" component={Home} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                path={['/create-activity', '/manage/:id']}
                key={key}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
};

export default observer(App);

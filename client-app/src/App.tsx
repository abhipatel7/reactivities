import { FC } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import {
  NavBar,
  ActivityDashboard,
  ActivityForm,
  ActivityDetails,
} from 'components';
import Home from 'pages/home';
import { Route, useLocation } from 'react-router-dom';

const App: FC = () => {
  const { key } = useLocation();

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Route exact path="/" component={Home} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route
          path={['/create-activity', '/manage/:id']}
          key={key}
          component={ActivityForm}
        />
      </Container>
    </>
  );
};

export default observer(App);

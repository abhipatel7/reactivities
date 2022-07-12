import { FC, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ActivityDashboard from './components/Activities/Dashboard';
import { Activity } from './types';
import { Container } from 'semantic-ui-react';
import NavBar from './components/layout/NavBar';

const App: FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5000/api/activities')
      .then((res) => {
        setActivities(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
};

export default App;

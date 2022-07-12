import { FC, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ActivityDashboard from './components/Activities/Dashboard';
import { Activity } from './types';
import { Container } from 'semantic-ui-react';
import NavBar from './components/layout/NavBar';
import { v4 } from 'uuid';

const App: FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivities] = useState<
    Activity | undefined
  >();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5000/api/activities')
      .then((res) => {
        setActivities(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const toggleSelectedActivity = (id?: string) => {
    if (!isEdit) {
      if (!id || (selectedActivity && selectedActivity.id === id)) {
        setSelectedActivities(undefined);
      } else {
        setSelectedActivities(
          activities.find((activity) => activity.id === id)
        );
      }
    }
  };

  const onFormOpen = (id?: string) => {
    isEdit && toggleSelectedActivity(id);
    setIsEdit(true);
  };

  const onFormClose = () => setIsEdit(false);

  const onCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: v4() }]);
    setSelectedActivities(activity);
  };

  const onDeleteActivity = (id: string) =>
    setActivities(activities.filter((activity) => activity.id !== id));

  return (
    <>
      <NavBar onFormOpen={onFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          toggleSelectedActivity={toggleSelectedActivity}
          isEdit={isEdit}
          onFormOpen={onFormOpen}
          onFormClose={onFormClose}
          onCreateOrEditActivity={onCreateOrEditActivity}
          onDeleteActivity={onDeleteActivity}
        />
      </Container>
    </>
  );
};

export default App;

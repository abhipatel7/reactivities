import { FC, useEffect, useState } from 'react';
import './App.css';
import ActivityDashboard from './components/Activities/Dashboard';
import { Activity } from './types';
import { Container } from 'semantic-ui-react';
import NavBar from './components/layout/NavBar';
import { v4 } from 'uuid';
import services from './services';
import Loader from './components/Loader';

const App: FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivities] = useState<
    Activity | undefined
  >();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    services.Activities.list()
      .then((res) => {
        let activities: Activity[] = [];
        res.forEach((activity) => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        });
        setActivities(activities);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const onSelectActivity = (id: string) =>
    setSelectedActivities(activities.find((activity) => activity.id === id));

  const onCancelSelectedActivity = () => setSelectedActivities(undefined);

  const onFormOpen = (id?: string) => {
    id ? onSelectActivity(id) : onCancelSelectedActivity();
    setIsEdit(true);
  };

  const onFormClose = () => setIsEdit(false);

  const onCreateOrEditActivity = (activity: Activity) => {
    setIsSubmitting(true);
    if (activity.id) {
      services.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivities(activity);
        setIsEdit(false);
        setIsSubmitting(false);
      });
    } else {
      activity.id = v4();
      services.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      });
      setSelectedActivities(activity);
      setIsEdit(false);
      setIsSubmitting(false);
    }
  };

  const onDeleteActivity = (id: string) => {
    setIsSubmitting(true);
    services.Activities.delete(id).then(() => {
      setActivities(activities.filter((activity) => activity.id !== id));
      setIsSubmitting(false);
    });
  };

  if (isLoading) {
    return <Loader content="Loading App..." />;
  }

  return (
    <>
      <NavBar onFormOpen={onFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          onSelectActivity={onSelectActivity}
          onCancelSelectedActivity={onCancelSelectedActivity}
          isEdit={isEdit}
          onFormOpen={onFormOpen}
          onFormClose={onFormClose}
          onCreateOrEditActivity={onCreateOrEditActivity}
          onDeleteActivity={onDeleteActivity}
          isSubmitting={isSubmitting}
        />
      </Container>
    </>
  );
};

export default App;

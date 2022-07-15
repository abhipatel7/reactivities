import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Loader, Segment } from 'semantic-ui-react';
import { useStore } from 'stores';
import { Activity } from 'types';
import { v4 } from 'uuid';

const ActivityForm: FC = () => {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    isLoading,
    loadActivityById,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const [activity, setActivity] = useState<Activity>({
    category: '',
    city: '',
    date: '',
    description: '',
    id: '',
    title: '',
    venue: '',
  });

  useEffect(() => {
    if (id)
      loadActivityById(id).then((activity) => {
        setActivity(activity!);
      });
  }, [id, loadActivityById]);

  const onSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: v4() };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  if (loadingInitial) return <Loader content="Loading Activity..." />;

  return (
    <Segment clearing>
      <Form onSubmit={onSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={onChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={onChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={onChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={onChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={onChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={onChange}
        />
        <Button
          floated="right"
          loading={isLoading}
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);

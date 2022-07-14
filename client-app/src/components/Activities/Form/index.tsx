import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from 'stores';
import { Activity } from 'types';

const ActivityForm: FC = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    onFormClose,
    onCreateActivity,
    onUpdateActivity,
    isLoading,
  } = activityStore;

  const initialState = selectedActivity ?? {
    category: '',
    city: '',
    date: '',
    description: '',
    id: '',
    title: '',
    venue: '',
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  const onSubmit = () =>
    activity.id ? onUpdateActivity(activity) : onCreateActivity(activity);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

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
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => onFormClose()}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);

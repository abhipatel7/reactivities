import { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../types';

interface Props {
  activity: Activity | undefined;
  onFormClose: () => void;
  onCreateOrEditActivity: (activity: Activity) => void;
}

const ActivityForm: FC<Props> = ({
  activity: initialActivity,
  onFormClose,
  onCreateOrEditActivity,
}) => {
  const initialState = initialActivity ?? {
    category: '',
    city: '',
    date: '',
    description: '',
    id: '',
    title: '',
    venue: '',
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  const onSubmit = () => onCreateOrEditActivity(activity);

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
        <Button floated="right" positive type="submit" content="Submit" />
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

export default ActivityForm;

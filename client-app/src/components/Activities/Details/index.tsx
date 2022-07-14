import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { useStore } from 'stores';
import { Loader } from 'components';

const ActivityDetails: FC = () => {
  const { activityStore } = useStore();
  const { selectedActivity, onFormOpen, onCancelSelectedActivity } =
    activityStore;

  if (!selectedActivity) return <Loader />;

  const { title, id, category, date, description } = selectedActivity;

  return (
    <Card
      fluid
      image={`/assets/categoryImages/${category}.jpg`}
      header={title}
      meta={date}
      description={description}
      extra={
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => onFormOpen(id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={onCancelSelectedActivity}
          />
        </Button.Group>
      }
    />
  );
};

export default observer(ActivityDetails);

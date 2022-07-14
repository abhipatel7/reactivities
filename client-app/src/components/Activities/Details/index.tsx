import { FC } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { Activity } from '../../../types';

interface Props {
  activity: Activity;
  onCancelSelectedActivity: () => void;
  onFormOpen: (id: string) => void;
}

const ActivityDetails: FC<Props> = ({
  activity: { category, city, date, description, id, title, venue },
  onCancelSelectedActivity,
  onFormOpen,
}) => {
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

export default ActivityDetails;

import { FC } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { Activity } from '../../../types';

interface Props {
  activity: Activity;
}

const ActivityDetails: FC<Props> = ({
  activity: { category, city, date, description, id, title, venue },
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
          <Button basic color="blue" content="Edit" />
          <Button basic color="grey" content="Cancel" />
        </Button.Group>
      }
    />
  );
};

export default ActivityDetails;

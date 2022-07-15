import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { useStore } from 'stores';
import { Loader } from 'components';
import { Link, useParams } from 'react-router-dom';

const ActivityDetails: FC = () => {
  const { activityStore } = useStore();
  const { selectedActivity, loadActivityById, loadingInitial } = activityStore;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivityById(id);
  }, [id, loadActivityById]);

  if (loadingInitial || !selectedActivity) return <Loader />;

  const { title, category, date, description } = selectedActivity;

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
            as={Link}
            to={`/manage/${id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to="/activities"
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      }
    />
  );
};

export default observer(ActivityDetails);

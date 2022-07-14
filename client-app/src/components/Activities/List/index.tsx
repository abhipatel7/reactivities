import { observer } from 'mobx-react-lite';
import { FC, SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from 'stores';

const ActivityList: FC = () => {
  const { activityStore } = useStore();
  const { onDeleteActivity, activitiesByDate, isLoading, onSelectActivity } =
    activityStore;

  const [target, setTarget] = useState('');

  const onActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    onDeleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map(
          ({ id, category, city, date, description, title, venue }) => (
            <Item key={id}>
              <Item.Content>
                <Item.Header as="a">{title}</Item.Header>
                <Item.Meta>{date}</Item.Meta>
                <Item.Description>
                  <div>{description}</div>
                  <div>
                    {city}, {venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => onSelectActivity(id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    onClick={(e) => onActivityDelete(e, id)}
                    loading={isLoading && target === id}
                    name={id}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                  <Label basic content={category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        )}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);

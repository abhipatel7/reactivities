import { FC } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../types';

interface Props {
  activities: Activity[];
}

const ActivityList: FC<Props> = ({ activities }) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map(
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
                  <Button floated="right" content="View" color="blue" />
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

export default ActivityList;

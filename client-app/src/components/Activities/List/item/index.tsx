import { FC } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Activity } from "types";
import { format } from "date-fns";

interface Props {
  activity: Activity;
}

const ActivityListItem: FC<Props> = ({
  activity: { category, city, date, description, id, title, venue },
}) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${id}`}>
                {title}
              </Item.Header>
              <Item.Description>Hosted by Abhi</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" /> {venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{description}</span>
        <Button
          as={Link}
          to={`/activities/${id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;

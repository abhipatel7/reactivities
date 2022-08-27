import { FC } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Activity } from "types";
import { format } from "date-fns";
import ActivityListItemAttendee from "../Attendee";

interface Props {
  activity: Activity;
}

const ActivityListItem: FC<Props> = ({
  activity: {
    category,
    city,
    date,
    description,
    id,
    title,
    venue,
    attendees,
    host,
    isGoing,
    isHost,
    isCancelled,
    hostUsername,
  },
}) => {
  return (
    <Segment.Group>
      <Segment>
        {isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 5 }}
              size="tiny"
              circular
              src={host?.image ?? "/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${id}`}>
                {title}
              </Item.Header>
              <Item.Description>
                Hosted by{" "}
                <Link to={`/profiles/${hostUsername}`}>
                  {host?.displayName}
                </Link>
              </Item.Description>
              {isHost && (
                <Item.Description>
                  <Label basic color="orange">
                    You are hosting this activity
                  </Label>
                </Item.Description>
              )}
              {isGoing && !isHost && (
                <Item.Description>
                  <Label basic color="green">
                    You are going to this activity
                  </Label>
                </Item.Description>
              )}
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
      <Segment secondary>
        <ActivityListItemAttendee attendees={attendees!} />
      </Segment>
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

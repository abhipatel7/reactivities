import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "types";
import { format } from "date-fns";
import { useStore } from "stores";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

const ActivityDetailsHeader: FC<Props> = ({
  activity: { category, date, title, id, isHost, isGoing, host, isCancelled },
}) => {
  const {
    activityStore: { updateAttendance, isLoading, cancelActivityToggle },
  } = useStore();

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancelled"
          />
        )}
        <Image
          src={`/assets/categoryImages/${category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={title}
                  style={{ color: "white" }}
                />
                <p>{format(date!, "dd MMM yyyy")}</p>
                <p>
                  Hosted by{" "}
                  <strong>
                    <Link to={`profiles/${host?.username}`}>
                      {host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {isHost ? (
          <>
            <Button
              color={isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={isCancelled ? "Re-activate Activity" : "Cancel Activity"}
              onClick={cancelActivityToggle}
              loading={isLoading}
            />
            <Button
              disabled={isCancelled}
              as={Link}
              to={`/manage/${id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          </>
        ) : isGoing ? (
          <Button loading={isLoading} onClick={updateAttendance}>
            Cancel attendance
          </Button>
        ) : (
          <Button
            disabled={isCancelled}
            loading={isLoading}
            onClick={updateAttendance}
            color="teal"
          >
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailsHeader);

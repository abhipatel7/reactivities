import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const NotFound: FC = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere and could not find this.
      </Header>
      <Segment.Inline>
        <Button
          as={Link}
          to="/activities"
          primary
          content="Return to activities page"
        />
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;

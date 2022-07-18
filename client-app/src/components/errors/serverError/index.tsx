import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "stores";

const ServerError: FC = () => {
  const {
    commonStore: { error },
  } = useStore();

  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" color="red" content={error?.message} />
      {error?.details && (
        <Segment>
          <Header as="h4" content="Stack trace" color="teal" />
          <code style={{ marginTop: 10 }}>{error.details}</code>
        </Segment>
      )}
    </Container>
  );
};

export default observer(ServerError);

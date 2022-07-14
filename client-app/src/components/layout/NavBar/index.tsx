import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { useStore } from 'stores';

const NavBar: FC = () => {
  const { activityStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item exact to="/" header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: '10px' }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            onClick={() => activityStore.onFormOpen()}
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);

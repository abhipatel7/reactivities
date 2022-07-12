import { FC } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

const NavBar: FC = () => {
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
        <Menu.Item to="/activities" name="Activities" />
        <Menu.Item>
          <Button to="/createActivity" positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;

import { FC } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

interface Props {
  onFormOpen: () => void;
}

const NavBar: FC<Props> = ({ onFormOpen }) => {
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
          <Button onClick={onFormOpen} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;

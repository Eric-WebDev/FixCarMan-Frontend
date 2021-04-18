import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout, isGarage } = rootStore.userStore;

  return (
    <Menu stackable pointing size="large">
      <Container>
        <Menu.Item>
          <img src="/assets/logoFMC.jpg" alt="Logo" />
          FixCarMan
        </Menu.Item>
        {user && <Menu.Item name="home" as={NavLink} exact to="/" />}
        {/* {user && (<Menu.Item name="garages" as={NavLink} to='/garages'/>)} */}
        {user && <Menu.Item name="Search Ad" as={NavLink} to="/adverts" />}

        {user && isGarage && (
          <Menu.Item>
            <Button
              inverted
              color="green"
              as={NavLink}
              to="/createAd"
              positive
              content="Create Ad"
            />
          </Menu.Item>
        )}

        {user && (
          <Menu.Item position="right">
            {/* <image avatar spaced='right' src={user.image || '/assets/user.png'} /> */}
            <Dropdown pointing="top left" text={user.username}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profiles/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                {user && isGarage && (
                  <Dropdown.Item
                    as={Link}
                    to={`/vehicles/${user.username}`}
                    text="My Cars"
                    icon="car"
                  />
                )}
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};
export default observer(NavBar);

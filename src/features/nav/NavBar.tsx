import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu, MenuItem, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

 const NavBar:React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Container>
      <Menu stackable pointing size="large"  >
      <Menu.Item>
          <img src='/assets/logoFMC.jpg' alt="Logo"/>
          FixCarMan
        </Menu.Item>

        <Menu.Item name="home" as={NavLink} exact to='/'/>
        <Menu.Item name="garages" as={NavLink} to='/garages'/>
        <Menu.Item name="Search Ad" as={NavLink} to='/adverts'/>
        {/* <Menu.Item>
          <Button inverted color='green'>Place Fix my Car Ad</Button>
        </Menu.Item> */}

        <Menu.Item>
          <Button
            inverted
            color='green'
            as={NavLink} to='/createAd'
            positive
            content='Create Ad'
          />
        </Menu.Item>

        <Menu.Menu position="right">
          {/* <Menu.Item name="login" />
          <Menu.Item name="Register" /> */}
          {user && (
          <Menu.Item position='right'>
            {/* <Image avatar spaced='right' src={user.image || '/assets/user.png'} /> */}
            <Menu.Item pointing='top left' text={user.username}>
               <Menu.Item onClick={logout} text='Logout' icon='power' />
            </Menu.Item>
          </Menu.Item>
        )}
        </Menu.Menu>
      </Menu>
    </Container>
  );
};
export default observer(NavBar);

import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem, Segment } from "semantic-ui-react";

 const NavBar:React.FC = () => {
  return (
    <Container>
      <Menu stackable pointing size="large"  >
      <Menu.Item>
          <img src='/assets/logoFMC.jpg' alt="Logo"/>
          FixCarMan
        </Menu.Item>

        <Menu.Item name="home" as={NavLink} to='/'/>
        <Menu.Item name="garages" as={NavLink} to='/garages'/>
        <Menu.Item name="Search Ad" as={NavLink} to='/adverts'/>
        <Menu.Item>
          <Button inverted color='green'>Place Fix my Car Ad</Button>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="login" />
          <Menu.Item name="Register" />
        </Menu.Menu>
      </Menu>
    </Container>
  );
};
export default observer(NavBar);

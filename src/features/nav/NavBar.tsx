import React from "react";
import { Button, Container, Menu, MenuItem, Segment } from "semantic-ui-react";

 const NavBar = () => {
  return (
    <Container>
      <Menu stackable pointing size="large" fixed="top" >
      <Menu.Item>
          <img src='/assets/logoFMC.jpg' alt="Logo"/>
          FixCarMan
        </Menu.Item>

        <Menu.Item name="home" />
        <Menu.Item name="garages" />
        <Menu.Item name="Search Ad" />
        <Menu.Item>
          <Button inverted color='green'>Place Fix my Car Ad</Button>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="login" />
          <Menu.Item name="Register" />
        </Menu.Menu>
      </Menu>
      <Segment >
        {/* <img src="/images/wireframe/media-paragraph.png" /> */}
      
      </Segment>
    </Container>
  );
};
export default NavBar;

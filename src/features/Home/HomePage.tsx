
import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Responsive,
  Card,
  Segment
} from "semantic-ui-react";
import NavBar from "../nav/NavBar";


const HomepageHeading = () => (
  <Segment>
    <Grid stackable>
      <Grid.Column width={8}>
        <Image src="/assets/pexels-cottonbro-4489702.jpg" alt="logo" />
      </Grid.Column>
      <Grid.Column width={8} textAlign="center" verticalAlign="middle">
        <Responsive />
        <Header
          as="h2"
          content="Place where you can find the best services"
        />
        <Button
          as={Link}
          to="/jobs"
          basic
          color="black"
          style={{ margin: "2em" }}
        >
          Get started
          <Icon  />
        </Button>
      </Grid.Column>
    </Grid>
  </Segment>
);
const HomePage = () => (
  
  <Container>
    <NavBar />
    <Segment textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            src='/assets/logoFMC.jpg' 
            alt='logo'
            style={{ marginBottom: 12 }}
          />
        </Header>
        <Header as='h2' inverted content='Welcome to Fix Car Man' />
        <Button as={Link} to='/adverts' size='huge' inverted>
          Take me to see adverts!
        </Button>
      </Container>
    </Segment>
    <HomepageHeading />
    <Segment>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h2" style={{ fontSize: "2em" }} textAlign="center">
              We are connecting Car Owners with Profesional and trusted Car Services
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              We are providing simple to use and free connection platform for
              car owners and  car services in Ireland. Getting someone to fix your car
              has never been more comfortable. We can help to find qualified, and trusted garage or 
              specialized advise.
            </p>
          </Grid.Column>

          <Grid.Column floated="right" width={8}>
            <Image
              bordered
              rounded
              size="large"
              src="/assets/pexels-tim-samuel-5835359.jpg"
              alt="Image car"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment>
      <Card.Group centered>
        <Card>
          <Card.Content textAlign="center">
            <Icon name="envelope open outline" size="huge" />
            <Card.Meta>Car Owners</Card.Meta>
            <Card.Description>
              {" "}
          {" "}
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content textAlign="center">
            <Icon name="add user" size="huge" />
            <Card.Meta content="Car Services"/>
            <Card.Description content="" />
          </Card.Content>
        </Card>

        <Card>
          <Card.Content textAlign="center">
            <Icon name="handshake outline" size="huge" />
            <Card.Meta content="Agreement" />
            <Card.Description content="" />
          </Card.Content>
        </Card>
      </Card.Group>
    </Segment>
   {/* <ScrollUpButton /> */}

    {/* <Footer /> */}
    <Segment/>
  </Container >
);
export default withRouter(HomePage);
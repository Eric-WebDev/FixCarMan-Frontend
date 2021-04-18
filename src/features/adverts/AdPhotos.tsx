import { observer } from "mobx-react-lite";
import { Tab, Header, Card, Grid, Divider } from "semantic-ui-react";

const src = "/assets/car.png";
const AdPhotos = () => {
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header
            floated="left"
            icon="image"
            size="large"
            color="teal"
            content="Photos"
          />
        </Grid.Column>
      </Grid>
      <Divider clearing />
      <Card.Group itemsPerRow={3}>
        <Card raised image={src} />
        <Card raised image={src} />
        <Card raised image={src} />
        <Card raised image={src} />
        <Card raised image={src} />
        <Card raised image={src} />
      </Card.Group>
    </Tab.Pane>
  );
};

export default observer(AdPhotos);

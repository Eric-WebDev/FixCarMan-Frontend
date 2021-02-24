import React from "react";
import { Grid, Segment, Image, Container, List } from "semantic-ui-react";
import { IGarage } from "../../app/models/vehicles/garage";
import GarageList from "./GarageList";


interface IProps {
  garages: IGarage[];
}
const GarageDisplay: React.FC<IProps> = ({garages}) => {
  return (
    <Container>
      <Grid stackable>
        <Grid.Column>
          <GarageList garages={garages}/>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default GarageDisplay;

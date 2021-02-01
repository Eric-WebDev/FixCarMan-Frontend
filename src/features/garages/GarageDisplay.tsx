import React from "react";
import { Grid, Segment, Image, Container, List } from "semantic-ui-react";
import { IUser } from "../../app/models/user";
import GarageList from "./GarageList";


interface IProps {
  garages: IUser[];
}
const GarageDisplay: React.FC<IProps> = ({garages}) => {
  return (
    <Container>
      <Grid stackable width={12}>
        <Grid.Column>
          <GarageList garages={garages}/>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default GarageDisplay;

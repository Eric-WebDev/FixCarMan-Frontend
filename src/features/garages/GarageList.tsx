import React from "react";
import { Card } from "semantic-ui-react";
import { IUser } from "../../app/models/user";

interface IProps {
  garages: IUser[];
}

const GarageList: React.FC<IProps> = ({ garages }) => {
  return (
    <Card.Group>
      {garages.map((garage) => (
        <Card key={garage.id}>
          <Card.Content>
            <Card.Header as="a">{garage.companyName}</Card.Header>
            <Card.Meta>{garage.street}</Card.Meta>
            <Card.Meta>{garage.city}</Card.Meta>
            <Card.Meta>{garage.county}</Card.Meta>
            <Card.Meta>{garage.url}</Card.Meta>
            <Card.Meta></Card.Meta>
            <Card.Description>{garage.profileDescription}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};
export default GarageList;

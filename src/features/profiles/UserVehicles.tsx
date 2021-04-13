import React, { useEffect, useContext, Fragment } from "react";
import { observer } from "mobx-react-lite";
import {
  Tab,
  Grid,
  Header,
  Card,
  TabProps,
  Button,
  Divider,
  Icon,
  Item,
  Table,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IVehicle } from "../../app/models/profiles/profile";
import { Link, RouteComponentProps } from "react-router-dom";

const src = "/assets/car.png";
interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}
// const panes = [{ menuItem: "Vehicles", pane: { key: "vehicles" } }];

const UserVehicle: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUserVehicles,
    vehicle,
    loadingVehicles,
    userVehicles,
  } = rootStore.vehicleStore;

  useEffect(() => {
    loadUserVehicles(match.params.id);
  }, [loadUserVehicles, vehicle]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = "vehicles";
        break;
      default:
        predicate = "vehicles";
        break;
    }
    loadUserVehicles(match.params.id, predicate);
  };
  interface IProps extends RouteComponentProps<RouteParams> {}
  const panes = [{ menuItem: "My car", pane: { key: "vehicles" } }];

  return (
    <Tab.Pane loading={loadingVehicles}>
      <Grid>
        <Grid.Column width={16}>
          <Divider horizontal>
            <Header>
              <Icon name="car" />
              Vehicles
            </Header>
          </Divider>
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />

          <Card.Group>
            {userVehicles !== null ? (
              <Button
                as={Link}
                to={`/createVehicle`}
                color="green"
                floated="right"
              >
                Ad car details
              </Button>
            ) : userVehicles ? (
              <Button>Send private message</Button>
            ) : (
              <Header>Contact provided only for verified users</Header>
            )}

            {userVehicles.map((vehicle: IVehicle) => (
              <Card fluid color="green">
                <Item.Content>
                  <Item.Header as="a">
                    {vehicle.carMake} {vehicle.carModel}{" "}
                  </Item.Header>
                  <Item.Meta>
                    <span className="cinema">{vehicle.registrationYear}</span>
                  </Item.Meta>

                  <Table celled compact definition>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Registration Number</Table.Cell>
                        <Table.Cell>{vehicle.registrationNumber}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Transmission</Table.Cell>
                        <Table.Cell>{vehicle.transmission}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Body Style</Table.Cell>
                        <Table.Cell>{vehicle.bodyStyle}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Fuel Type</Table.Cell>
                        <Table.Cell>{vehicle.fuelType}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Number of seats</Table.Cell>
                        <Table.Cell>{vehicle.numberOfSeats}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Number of doors</Table.Cell>
                        <Table.Cell>{vehicle.numberOfDoors}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Body Style</Table.Cell>
                        <Table.Cell>{vehicle.bodyStyle}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Engine Size</Table.Cell>
                        <Table.Cell>{vehicle.engineSize}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Vin number</Table.Cell>
                        <Table.Cell>{vehicle.vin}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Car services details</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                    </Table.Body>

                    <Table.Footer fullWidth>
                      <Table.Row>
                        <Table.HeaderCell colSpan="4">
                          <Button floated="right" color="green">
                            Edit details
                          </Button>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>

                  <Divider clearing />
                  <Card.Group itemsPerRow={3}>
                    <Card raised image={src} />
                    <Card raised image={src} />
                    <Card raised image={src} />
                  </Card.Group>
                </Item.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(UserVehicle);

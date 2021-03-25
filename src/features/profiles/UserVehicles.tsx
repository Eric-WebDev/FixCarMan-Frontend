import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps, Button, Divider, Icon } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import {  IVehicle } from '../../app/models/profiles/profile';
import { RouteComponentProps } from 'react-router-dom';

interface RouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}
const panes = [
  { menuItem: 'Vehicles', pane: { key: 'vehicles' } }

];

const UserVehicle:React.FC<IProps> = ({match}) => {
  
  const rootStore = useContext(RootStoreContext);
  const {
   loadUserVehicles,
   vehicle,
   loadingVehicles,
   userVehicles   
  } = rootStore.vehicleStore;


  useEffect(() => {
    loadUserVehicles(match.params.id);
  }, [loadUserVehicles,vehicle]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = 'vehicles';
        break;
      default:
        predicate = 'vehicles';
        break;
    }
    loadUserVehicles(match.params.id,predicate);
  };

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
          
          <Card.Group itemsPerRow={4}>
            {userVehicles.map((vehicle: IVehicle) => (
              <Card
                // as={Link}
                // to={`/vehicles/${vehicle.id}`}
                // key={vehicle.id}
              >
               
                <Card.Content>
                  <Card.Header textAlign='center'>{vehicle.carMake}</Card.Header>
                  <Card.Meta textAlign='center'>
                    {vehicle.carModel}
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(UserVehicle);



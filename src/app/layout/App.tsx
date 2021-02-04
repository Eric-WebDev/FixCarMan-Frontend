import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../features/nav/NavBar";
import { observer } from 'mobx-react-lite';
import { Container } from "semantic-ui-react";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from 'react-router';
import HomePage from "../../features/Home/HomePage";
import { ToastContainer } from "react-toastify";
import Dashboard from "../../features/adverts/Dashboard";
import AdItem from "../../features/adverts/AdItem";
import AdForm from "../../features/adverts/AdForm";
import NotFound from "./NotFound";
import GarageDisplay from "../../features/garages/GarageDisplay";
import axios from "axios";
import { IUser } from "../models/users/user";

const App: React.FC<RouteComponentProps> = ({ location }) => {

  const [garages, setGarages] = useState<IUser[]>([]);

  useEffect(() => {
    axios
      .get<IUser[]>("https://localhost:5003/api/usersprofiles")
      .then((response) => {
        let garages: IUser[] = [];
        response.data.forEach((garage) => {
          garages.push(garage);
        });
        setGarages(garages);
      });
  }, []);

  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            
            <Container style={{ marginTop: '7em' }}>
            
            
              <Switch>
                <Route exact path='/adverts' component={Dashboard} />
                <Route path='/adverts/:id' component={AdItem} />
                <Route exact path='/garages' ><GarageDisplay garages={garages} /></Route>
                <Route
                  key={location.key}
                  path={['/createAd', '/manage/:id']}
                  component={AdForm}
                />
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};


export default withRouter(observer(App));

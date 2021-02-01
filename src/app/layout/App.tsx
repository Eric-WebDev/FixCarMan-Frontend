import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../features/nav/NavBar";
import { IUser } from "../models/user";
import { observer } from 'mobx-react-lite';
import { Container } from "semantic-ui-react";
import GarageDisplay from "../../features/garages/GarageDisplay";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from 'react-router';
import HomePage from "../../features/Home/HomePage";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>     
            <NavBar />    
    </Fragment>
  );
};

export default withRouter(observer(App));

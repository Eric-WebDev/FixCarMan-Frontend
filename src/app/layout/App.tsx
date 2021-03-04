import React, { Fragment, useContext, useEffect, useState } from "react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { Route, withRouter, RouteComponentProps, Switch } from "react-router";
import HomePage from "../../features/Home/HomePage";
import { ToastContainer } from "react-toastify";
import Dashboard from "../../features/adverts/Dashboard";
import AdItem from "../../features/adverts/AdItem";
import AdForm from "../../features/adverts/AdForm";
import NotFound from "./NotFound";
import GarageDisplay from "../../features/garages/GarageDisplay";
import axios from "axios";
import { IUser } from "../models/users/user";
import LoginForm from "../../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./Loadding";
import 'semantic-ui-css/semantic.min.css';
import ModalContainer from "../Common/modals/ModalContainer";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../../features/profiles/ProfilePage";
const App: React.FC<RouteComponentProps> = ({ location }) => {
  // const [garages, setGarages] = useState<IUser[]>([]);

  // useEffect(() => {
  //   axios
  //     .get<IUser[]>("https://localhost:5003/api/usersprofiles")
  //     .then((response) => {
  //       let garages: IUser[] = [];
  //       response.data.forEach((garage) => {
  //         garages.push(garage);
  //       });
  //       setGarages(garages);
  //     });
  // }, []);
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded)  return <LoadingComponent content='Loading app...' />
  return (
    <Fragment>
       <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>           
            <Container>
            <NavBar />
              <Switch>
                <Route exact path="/adverts" component={Dashboard} />
                <Route path="/adverts/:id" component={AdItem} />
                {/* <Route exact path="/garages">
                  <GarageDisplay garages={garages} />
                </Route> */}
                {/* <Route
                  key={location.key}
                  path={["/createAd", "/manage/:id"]}
                  component={AdForm}
                /> */}
               <PrivateRoute path='/profiles/:username' component={ProfilePage} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));

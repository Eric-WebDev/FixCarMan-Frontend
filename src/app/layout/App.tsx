import React, { Fragment, useContext, useEffect } from "react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { Route, withRouter, RouteComponentProps, Switch } from "react-router";
import HomePage from "../../features/Home/HomePage";
import { ToastContainer } from "react-toastify";
import Dashboard from "../../features/adverts/Dashboard";
import AdForm from "../../features/adverts/AdForm";
import NotFound from "./NotFound";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./Loadding";
import 'semantic-ui-css/semantic.min.css';
import ModalContainer from "../Common/modals/ModalContainer";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../../features/profiles/ProfilePage";
import Details from "../../features/adverts/Details";
import UserVehicles from "../../features/profiles/UserVehicles";
import VehicleForm from "../../features/profiles/VehicleForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
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
                <PrivateRoute exact path="/adverts" component={Dashboard} />
                <PrivateRoute path="/adverts/:id" component={Details} />
                <PrivateRoute
                  key={location.key}
                  path={["/createAd", "/manage/:id"]}
                  component={AdForm}
                />
               <PrivateRoute path='/profiles/:username' component={ProfilePage} />
               <PrivateRoute path='/vehicles/:id' component={UserVehicles} />
               <PrivateRoute
                  key={location.key}
                  path={["/createVehicle", "/manage/:id"]}
                  component={VehicleForm}
                />
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

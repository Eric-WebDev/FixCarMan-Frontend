import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import {
  Tab,
  Grid,
  Header,
  Card,
  Image,
  TabProps,
  Button,
  Divider,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserAdvert } from "../../app/models/profiles/profile";

const panes = [
  { menuItem: "Active", pane: { key: "active" } },
  { menuItem: "Expired", pane: { key: "expired" } },
  { menuItem: "All", pane: { key: "all" } },
];

const ProfileEvents = () => {
  const rootStore = useContext(RootStoreContext);

  const {
    loadUserAdverts,
    profile,
    loadingAdverts,
    userAdverts,
  } = rootStore.profileStore!;

  useEffect(() => {
    loadUserAdverts(profile!.username);
  }, [loadUserAdverts, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = "expired";
        break;
      case 2:
        predicate = "all";
        break;
      default:
        predicate = "active";
        break;
    }
    loadUserAdverts(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingAdverts}>
      <Grid>
        <Grid.Column width={16}>
          <Divider horizontal>
            {profile?.UserGarage !== "garage" && (
              <Header>
                <Icon name="car" />
                Fixed Cars
              </Header>
            )}
             {profile?.UserGarage == "garage" && (
              <Header>
                <Icon name="adversal" />
                My Adverts
              </Header>
            )}
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
            {userAdverts.map((advert: IUserAdvert) => (
              <Card as={Link} to={`/adverts/${advert.id}`} key={advert.id}>
                <Card.Content>
                  <Card.Header textAlign="center">{advert.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(advert.date), "do LLL")}</div>
                    <div>{format(new Date(advert.date), "h:mm a")}</div>
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

export default observer(ProfileEvents);

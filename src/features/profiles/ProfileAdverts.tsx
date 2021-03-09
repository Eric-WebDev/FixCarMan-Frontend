import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserAdvert } from '../../app/models/profiles/profile';


const ProfileEvents = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUserAdverts,
    profile,
    loadingAdverts,
    userAdverts
  } = rootStore.profileStore!;

  useEffect(() => {
    loadUserAdverts(profile!.username);
  }, [loadUserAdverts, profile]);


  return (
    <Tab.Pane loading={loadingAdverts}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={'Adverts'} />
        </Grid.Column>
        <Grid.Column width={16}>
         
          <br />
          <Card.Group itemsPerRow={4}>
            {userAdverts.map((advert: IUserAdvert) => (
              <Card
                as={Link}
                to={`/adverts/${advert.id}`}
                key={advert.id}
              >
                {/* <Image
                  src={`/assets/categoryImages/${advert}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                /> */}
                <Card.Content>
                  <Card.Header textAlign='center'>{advert.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(new Date(advert.date), 'do LLL')}</div>
                    <div>{format(new Date(advert.date), 'h:mm a')}</div>
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
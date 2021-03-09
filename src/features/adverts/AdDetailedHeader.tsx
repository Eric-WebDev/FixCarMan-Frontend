import React, { useContext } from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { IAdvert } from '../../app/models/advertsFixCar/adverts';
import { RootStoreContext } from '../../app/stores/rootStore';


const adImageStyle = {
  filter: 'brightness(30%)'
};

const adImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const AdDetailedHeader: React.FC<{ ad: IAdvert }> = ({
ad
}) => {
  const advertiser = ad.advertiser;
  const loggedInUser = localStorage.getItem("user");
  const rootStore = useContext(RootStoreContext);
  const { loading } = rootStore.adStore;
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        {/* <Image
          src={`/assets/categoryImages/${ad.carModel}.jpg`}
          fluid
          style={adImageStyle}
        /> */}
        <Segment style={adImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={ad.title}
                  style={{ color: 'white' }}
                />
                <p>{format(ad.date, 'eeee do MMMM')}</p>
                <p>
                  advertiser username {' '}
                  <Link to={`/profile/${advertiser.advertiserName}`}>
                    <strong>{advertiser.advertiserName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {loggedInUser? (
          <Button
            as={Link}
            to={`/manage/${ad.id}`}
            color='orange'
            floated='right'
          >
            Manage My Adverts
          </Button>
        )  : (
          <Button loading={loading} color='blue'>
            Contact
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(AdDetailedHeader);

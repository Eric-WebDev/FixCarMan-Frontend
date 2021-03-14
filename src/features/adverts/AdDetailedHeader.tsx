import React, { useContext } from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { IAdvert } from '../../app/models/advertsFixCar/adverts';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IProfile } from '../../app/models/profiles/profile';


// const adImageStyle = {
//   filter: 'brightness(30%)'
// };

// const adImageTextStyle = {
//   position: 'absolute',
//   bottom: '5%',
//   left: '5%',
//   width: '100%',
//   height: 'auto',
//   color: 'white'
// };


const AdDetailedHeader: React.FC<{ ad: IAdvert }> = ({
ad}) => {
  
  const rootStore = useContext(RootStoreContext);
  const {  loading } = rootStore.adStore;
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        
        <Segment  basic>
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
                  Advertised by{' '}
                  <Link to={`/profile/${ad.advertiserUsername}`}> 
                     <strong>{ad.advertiserUsername}</strong> 
                   </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {ad.isAdvertCreator ? (
          <Button
            as={Link}
            to={`/manage/${ad.id}`}
            color='green'
            floated='right'
          >
            Manage Advert
          </Button>
        ) :  !ad.isContactAlowed ?(
          <Button loading={loading} >
            Send private message
          </Button>
        ) : (
          <Button loading={loading}  color='teal'>
            Contact to fix 
          </Button>
        )}
      </Segment>
    </Segment.Group>
  )
};

export default observer(AdDetailedHeader);

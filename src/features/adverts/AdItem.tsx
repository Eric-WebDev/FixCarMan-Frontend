import React from 'react';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import {format} from 'date-fns';
import { IAdvert } from '../../app/models/advertsFixCar/adverts';

const AdItem: React.FC<{ ad: IAdvert }> = ({ ad }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>          
            <Item.Content>
              <Item.Header as='a'>{ad?.title}</Item.Header>
              <Item.Meta >
              <Icon name='car' /> {ad?.carModel}
                </Item.Meta>
              {/* <Icon name='car' />{" "} {ad.carModel}{" "}  */}
              <Item.Description>{ad?.description}</Item.Description>
            </Item.Content>
            <Item.Image size='small'  src='/assets/car.jpg' />
          </Item>
          <Button color='blue' inverted >Contact me </Button>
        </Item.Group>
      </Segment>
      <Segment >    
        <Icon name='user' />{" "}{ad?.advertiser?.advertiserName}{" | "} 
        <Icon name='marker' /> {" "} {ad?.city}{" | "} 
        <Icon name='time' />{" "} {format(ad.date, 'MMMM do, yyyy')}{" "}
      </Segment>
    </Segment.Group>
  );
};

export default AdItem;
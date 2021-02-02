import React from 'react';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import { IAdvert } from '../../app/models/advertsFixCar/adverts';

const AdItem: React.FC<{ ad: IAdvert }> = ({ ad }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
           
            <Item.Content>
              <Item.Header as='a'>{ad.title}</Item.Header>
              <Item.Description>{ad.description}</Item.Description>
            </Item.Content>
            <Item.Image size='tiny'  src='/assets/user.png' />
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='car' />{" "} {ad.carModel}{" "} 
        <Icon name='marker' /> {" "} {ad.city}{" "} 
        <Icon name='time'/> {" "} {format(ad.date, 'MMMM do, yyyy')}{" "} 
      </Segment>
    </Segment.Group>
  );
};

export default AdItem;
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
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as='a'>{ad.title}</Item.Header>
              <Item.Description>Car fix</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {format(ad.date, 'h:mm a')}
        <Icon name='marker' /> {ad.carModel}, {ad.city}
      </Segment>
    </Segment.Group>
  );
};

export default AdItem;
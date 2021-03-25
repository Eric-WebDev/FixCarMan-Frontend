import React from 'react';
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react';
import {format} from 'date-fns';
import { IAdvert } from '../../app/models/advertsFixCar/adverts';
import { Link } from 'react-router-dom';


const AdItem: React.FC<{ ad: IAdvert}> = ({ ad }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>          
            <Item.Content>
            <Item.Header as={Link} to={`/adverts/${ad.id}`}>
                {ad.title}
              </Item.Header>
              <Item.Meta >
              <Icon name='car' /> {ad?.carModel}
                </Item.Meta>
              
              {/* <Item.Description>{ad?.description}</Item.Description> */}
              <Button
          as={Link}
          to={`/adverts/${ad.id}`}
          floated='left'
          content='More details'
          color='blue'
        />
            </Item.Content>
            <Item.Image size='small'  src='/assets/car.jpg' />
          </Item>
        </Item.Group>      
      </Segment>     
      <Segment >    
        <Icon name='user' />{" "}{ad?.advertiserUsername}{" | "} 
        <Icon name='marker' /> {" "} {ad?.city}{" | "} 
        <Icon name='time' />{" "} {format(ad.date, 'MMMM do, yyyy')}{" "}
        </Segment>
        </Segment.Group>
  );
};

export default AdItem;

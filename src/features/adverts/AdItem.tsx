import React from 'react';
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react';
import {format} from 'date-fns';
import { IAdvert } from '../../app/models/advertsFixCar/adverts';
import { Link } from 'react-router-dom';


const AdItem: React.FC<{ ad: IAdvert}> = ({ ad }) => {
   const advertiser = ad.advertiser;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            {/* <Item.Image
              size='tiny'
              circular
              src={advertiser.image || '/assets/user.png'}
              style={{ marginBottom: 3 }}
            /> */}
            <Item.Content>
              <Item.Header as={Link} to={`/adverts/${ad.id}`}>
                {ad.title}
              </Item.Header>
              <Item.Description>
                Advertised by
                <Link to={`/profile/${ad.advertiserUsername}`}> {ad.advertiserUsername}</Link>
              </Item.Description>
              {ad.isAdvertCreator && (
                <Item.Description>
                  <Label
                    basic
                    color='green'
                    content='You created this advert'
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
     

        <Item.Group>
          <Item>          
            <Item.Content>
            <Item.Header as={Link} to={`/adverts/${ad.id}`}>
                {ad.title}
              </Item.Header>
              <Item.Meta >
              <Icon name='car' /> {ad?.carModel}
                </Item.Meta>
              
              <Item.Description>{ad?.description}</Item.Description>
            </Item.Content>
            <Item.Image size='small'  src='/assets/car.jpg' />
          </Item>
          <Button color='blue' inverted >Contact me </Button>
        </Item.Group>
      </Segment>
      <Segment >    
        <Icon name='user' />{" "}{ad?.advertiserUsername}{" | "} 
        <Icon name='marker' /> {" "} {ad?.city}{" | "} 
        <Icon name='time' />{" "} {format(ad.date, 'MMMM do, yyyy')}{" "}
        </Segment>
        <Segment clearing>
        <span>{ad.description}</span>
        <Button
          as={Link}
          to={`/adverts/${ad.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
        </Segment.Group>
  );
};

export default AdItem;

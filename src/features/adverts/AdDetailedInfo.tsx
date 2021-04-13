import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import {format} from 'date-fns';
import { IAdvert } from '../../app/models/advertsFixCar/adverts';
import AdPhotos from './AdPhotos';

const AdDetailedInfo: React.FC<{ad: IAdvert}> = ({ad}) => {
  return (
    <Segment.Group>

       <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='car' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{ad.carModel} {ad.carMake}</p>          
          </Grid.Column>
          <Grid.Column width={15}>
          <p>{ad.registrationNumber}</p>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{ad.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(ad.date, 'eeee do MMMM')} at {format(ad.date!, 'h:mm a')}</span>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {ad.city}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    <AdPhotos/>

    </Segment.Group>
  );
};

export default AdDetailedInfo;
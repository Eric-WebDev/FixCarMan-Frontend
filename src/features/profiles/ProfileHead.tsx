import React from 'react';
import {
  Segment,
  Item,
  Header,
  Grid

} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IProfile } from '../../app/models/profiles/profile';


interface IProps {
  profile: IProfile;
  isCurrentUser: boolean;
  loading: boolean;
}

const ProfileHead: React.FC<IProps> = ({
  profile,
  isCurrentUser,
  loading,
}) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.image || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header as='h1'>{profile.UserGarage}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHead);

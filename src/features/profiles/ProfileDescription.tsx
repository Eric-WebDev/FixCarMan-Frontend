import React, { useContext, useState } from 'react';
import { Tab, Grid, Header, Button, Divider, Icon } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import ProfileEditForm from './ProfileEditForm';

const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
        <Divider horizontal>
            <Header>
              <Icon name="user" />
              {profile!.username}'s profile
            </Header>
          </Divider>
          {isCurrentUser && (
            <Button
              floated='right'
              inverted 
              color='blue'
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm updateProfile={updateProfile} profile={profile!} />
          ) : (
            <span>{profile!.profileDescription}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileDescription);
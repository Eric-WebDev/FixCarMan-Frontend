import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../app/layout/Loadding';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';
import ProfileHead from './ProfileHead';


interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingProfile,
    profile,
    loadProfile,
    isCurrentUser,
    loading,
    setActiveTab
  } = rootStore.profileStore;
  const { isGarage } = rootStore.userStore;
  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);

  if (loadingProfile) return <LoadingComponent content='Loading profile...' />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHead
          profile={profile!}
          isCurrentUser={isCurrentUser}
          loading={loading}
        />
        <ProfileContent setActiveTab={setActiveTab}  isGarage={isGarage!}/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
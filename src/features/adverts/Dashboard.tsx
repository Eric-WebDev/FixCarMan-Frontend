import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import AdStore from '../../app/stores/adStore'
import LoadingComponent from '../../app/layout/Loadding';
import AdList from './AdList'
const Dashboard: React.FC = () => {

  const adStore = useContext(AdStore);

  useEffect(() => {
    adStore.loadAds();
  }, [adStore]);

  if (adStore.loadingInitial)
    return <LoadingComponent content='Loading ads' />;

  return (
    <Grid>
      <Grid.Column>
        <AdList/>
      </Grid.Column> 
    </Grid>
  );
};

export default observer(Dashboard);
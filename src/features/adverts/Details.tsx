import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoadingComponent from '../../app/layout/Loadding';
// import AdDetailedHeader from './AdDetailedHeader';
import AdDetailedInfo from './AdDetailedInfo';


interface DetailParams {
  id: string;
}

const AdDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { ad, loadAd, loadingInitial } = rootStore.adStore;

  useEffect(() => {
    loadAd(match.params.id);
  }, [loadAd, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading ads...' />;

  if (!ad) return <h2>Ad not found</h2>;

  return (
    <Grid>
      <Grid.Column width={12}>
        {/* <AdDetailedHeader ad={ad} /> */}
        <AdDetailedInfo ad={ad} />
      </Grid.Column>
  
    </Grid>
  );
};

export default observer(AdDetails);

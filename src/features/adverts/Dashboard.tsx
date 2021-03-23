import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import AdList from './AdList'
import { RootStoreContext } from '../../app/stores/rootStore';
import AdItemItemPlaceholder from './AdItemPlaceholder';
import InfiniteScroll from 'react-infinite-scroller';

const Dashboard: React.FC = () => {

  const rootStore = useContext(RootStoreContext);
  const {
    loadAds,
    loadingInitial,
    setPage,
    page,
    totalPages
  } = rootStore.adStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadAds().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  return (
    <Grid >
    <Grid.Column  width={10}>
      {loadingInitial && page === 0 ? (
        <AdItemItemPlaceholder />
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <AdList />
        </InfiniteScroll>
      )}
    </Grid.Column>
    <Grid.Column width={6}>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
  </Grid>
  );
};

export default observer(Dashboard);
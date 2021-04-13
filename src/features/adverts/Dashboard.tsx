import React, { useContext, useEffect, useState } from "react";
import { Advertisement, Grid, Loader } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import AdList from "./AdList";
import { RootStoreContext } from "../../app/stores/rootStore";
import AdItemItemPlaceholder from "./AdItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import AdFilters from "./AdFilters";

const Dashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadAds,
    loadingInitial,
    setPage,
    page,
    totalPages,
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
  const [size, setSize] = useState("s");
  const style = {
    fontFamily: '"Nunito Sans", sans-serif',
    marginTop: "24px",
  };

  return (
    <Grid>
      <Grid.Column width={12}>
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
      <Grid.Column width={4}>
        {/* <Advertisement
          unit="vertical rectangle"
          test="Advertisement placeholder"
        /> */}
        <AdFilters/>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(Dashboard);

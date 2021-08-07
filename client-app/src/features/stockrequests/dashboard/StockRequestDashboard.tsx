import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import StockRequestList from './StockRequestList';
import { RootStoreContext } from '../../../app/stores/rootStore';



const StockRequestDashboard: React.FC = () => {

  const rootStore = useContext(RootStoreContext);

  const {loadStockRequests, loadingInitial} = rootStore.stockrequestStore


  useEffect(() => {
    loadStockRequests();
  }, [loadStockRequests]);


  if (loadingInitial)
    return <LoadingComponent content="Loading stockrequests" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <StockRequestList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>StockRequests filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(StockRequestDashboard);

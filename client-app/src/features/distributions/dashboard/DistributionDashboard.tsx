import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import DistributionList from './DistributionList';
import { RootStoreContext } from '../../../app/stores/rootStore';

const DistributionDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadDistributions, loadingInitial} = rootStore.distributionStore

  useEffect(() => {
    loadDistributions();
  }, [loadDistributions]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Distributions" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <DistributionList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Distributions filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(DistributionDashboard);

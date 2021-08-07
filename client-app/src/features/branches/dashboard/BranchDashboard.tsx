import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import BranchList from './BranchList';
import { RootStoreContext } from '../../../app/stores/rootStore';

const BranchDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadBranches, loadingInitial} = rootStore.branchStore;

  useEffect(() => {
    loadBranches();
  }, [loadBranches]);

  if (loadingInitial)
    return <LoadingComponent content="Loading branches" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <BranchList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Branches filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(BranchDashboard);

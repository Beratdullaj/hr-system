import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ContractList from './ContractList';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ContractDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadContracts,loadingInitial} = rootStore.contractStore;

  useEffect(() => {
    loadContracts();
  }, [loadContracts]);

  if (loadingInitial)
    return <LoadingComponent content="Loading contracts" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <ContractList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Contract filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ContractDashboard);

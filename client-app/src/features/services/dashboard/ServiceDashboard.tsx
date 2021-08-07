import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ServiceList from './ServiceList';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ServiceDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadServices, loadingInitial} = rootStore.serviceStore

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Services" />;
    
  return (
    <Grid>
      
      <Grid.Column width={16}>
        <ServiceList />
      </Grid.Column>
    
    </Grid>
  );
};

export default observer(ServiceDashboard);
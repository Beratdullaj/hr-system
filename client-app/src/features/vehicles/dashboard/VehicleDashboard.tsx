import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import VehicleList from './VehicleList';
import { RootStoreContext } from '../../../app/stores/rootStore';

const VehicleDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadVehicles, loadingInitial} = rootStore.vehicleStore

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Vehicles" />;
    
  return (
    <Grid>
      
      <Grid.Column width={16}>
        <VehicleList />
      </Grid.Column>
    
    </Grid>
  );
};

export default observer(VehicleDashboard);
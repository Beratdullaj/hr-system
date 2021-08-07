import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PermissionList from './PermissionList';
import { RootStoreContext } from '../../../app/stores/rootStore';

const PermissionDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadPermissions, loadingInitial} = rootStore.permissionStore;

  useEffect(() => {
    loadPermissions();
  }, [loadPermissions]);

  if (loadingInitial)
    return <LoadingComponent content="Loading permissions" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <PermissionList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Permission filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PermissionDashboard);

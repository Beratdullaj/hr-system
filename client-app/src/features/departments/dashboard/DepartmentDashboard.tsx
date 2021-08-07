import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import DepartmentList from '../dashboard/DepartmentList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const DepartmentDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadDepartments, loadingInitial} = rootStore.departmentStore

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  if (loadingInitial)
    return <LoadingComponent content="Loading departments" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <DepartmentList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Department filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(DepartmentDashboard);

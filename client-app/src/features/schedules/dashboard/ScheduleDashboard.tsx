import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ScheduleList from '../dashboard/ScheduleList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ScheduleDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadSchedules, loadingInitial} = rootStore.scheduleStore

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Schedules" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <ScheduleList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ScheduleDashboard);
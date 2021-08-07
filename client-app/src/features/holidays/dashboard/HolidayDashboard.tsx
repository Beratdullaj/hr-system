import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import HolidayList from '../dashboard/HolidayList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const HolidayDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadHolidays, loadingInitial} = rootStore.holidayStore

  useEffect(() => {
    loadHolidays();
  }, [loadHolidays]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Holidays" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <HolidayList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(HolidayDashboard);
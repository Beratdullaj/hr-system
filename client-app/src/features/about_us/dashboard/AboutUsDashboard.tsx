import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import AboutUsList from '../dashboard/AboutUsList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const AboutUsDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadAbout_Us, loadingInitial} = rootStore.aboutusStore;

  useEffect(() => {
    loadAbout_Us();
  }, [loadAbout_Us]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Abot Us" />;;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <AboutUsList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(AboutUsDashboard);

import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import NewList from '../dashboard/NewList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const NewDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadNews, loadingInitial} = rootStore._newStore

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  if (loadingInitial)
    return <LoadingComponent content="Loading news" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <NewList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(NewDashboard);
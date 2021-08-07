import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import TeamList from './TeamList';
import { RootStoreContext } from '../../../app/stores/rootStore';

const TeamDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadTeams, loadingInitial} = rootStore.teamStore

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  if (loadingInitial)
    return <LoadingComponent content="Loading teams" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <TeamList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Teams filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(TeamDashboard);

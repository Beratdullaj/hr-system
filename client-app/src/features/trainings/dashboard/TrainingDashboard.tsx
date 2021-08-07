import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import TrainingList from '../dashboard/TrainingList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const TrainingDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadTrainings, loadingInitial} = rootStore.trainingStore

  useEffect(() => {
    loadTrainings();
  }, [loadTrainings]);

  if (loadingInitial)
    return <LoadingComponent content="Loading traiinings" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <TrainingList />
      </Grid.Column>
      
    </Grid>
  );
};

export default observer(TrainingDashboard);

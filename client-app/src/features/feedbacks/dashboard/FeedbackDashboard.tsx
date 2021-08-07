import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import FeedbackList from '../dashboard/FeedbackList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const FeedbackDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadFeedbacks, loadingInitial} = rootStore.feedbackStore

  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks]);

  if (loadingInitial)
    return <LoadingComponent content="Loading feedbacks" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <FeedbackList />
      </Grid.Column>
      
    </Grid>
  );
};

export default observer(FeedbackDashboard);

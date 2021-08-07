import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import MemoList from '../dashboard/MemoList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const MemoDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadMemos, loadingInitial} = rootStore.memoStore

  useEffect(() => {
    loadMemos();
  }, [loadMemos]);

  if (loadingInitial)
    return <LoadingComponent content="Loading memos" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <MemoList />
      </Grid.Column>
      
    </Grid>
  );
};

export default observer(MemoDashboard);

import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ProjectList from './ProjectList';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ProjectDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadProjects, loadingInitial} = rootStore.projectStore

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  if (loadingInitial)
    return <LoadingComponent content="Loading projects" />;
    
  return (
    <Grid>
      <Grid.Column width={10}>
        <ProjectList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Projects filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProjectDashboard);

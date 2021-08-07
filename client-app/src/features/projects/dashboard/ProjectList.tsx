import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ProjectList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {projectsByDate, deleteProject, submitting, target} = rootStore.projectStore;
  return (
    
    <Segment clearing>
      <Item.Group divided>
        {projectsByDate.map(project => (
          <Item key={project.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{project.title}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link} to={`/projects/${project.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={project.id}
                  loading={target === project.id && submitting}
                  onClick={(e) => deleteProject(e, project.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
  
};

export default observer(ProjectList);

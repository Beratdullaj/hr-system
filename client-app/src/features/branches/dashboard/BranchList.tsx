import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const BranchList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {branchesByDate, deleteBranch, submitting, target} = rootStore.branchStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {branchesByDate.map(branch => (
          
          <Item key={branch.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{branch.location}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link} to={`/branches/${branch.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                
                <Button
                  name={branch.id}
                  loading={target === branch.id && submitting}
                  onClick={(e) => deleteBranch(e, branch.id)}
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

export default observer(BranchList);

import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const DistributionList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {distributionsByDate, deleteDistribution, submitting, target} = rootStore.distributionStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {distributionsByDate.map(distribution => (
          <Item key={distribution.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{distribution.id}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link} to={`/distributions/${distribution.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={distribution.id}
                  loading={target === distribution.id && submitting}
                  onClick={(e) => deleteDistribution(e, distribution.id)}
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

export default observer(DistributionList);

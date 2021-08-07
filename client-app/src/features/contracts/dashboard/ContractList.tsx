import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ContractList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {contractsByDate, deleteContract, submitting, target} = rootStore.contractStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {contractsByDate.map(contract => (
          <Item key={contract.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{contract.salary}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link} to={`/contracts/${contract.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={contract.id}
                  loading={target === contract.id && submitting}
                  onClick={(e) => deleteContract(e, contract.id)}
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

export default observer(ContractList);

import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const StockRequestList: React.FC = () => {

  const rootStore = useContext(RootStoreContext);

  const {stockrequestsByDate, deleteStockRequest, submitting, target} = rootStore.stockrequestStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {stockrequestsByDate.map(stockrequest => (
          <Item key={stockrequest.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{stockrequest.quantity}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link} to={`/stockrequests/${stockrequest.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={stockrequest.id}
                  loading={target === stockrequest.id && submitting}
                  onClick={(e) => deleteStockRequest(e, stockrequest.id)}
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

export default observer(StockRequestList);

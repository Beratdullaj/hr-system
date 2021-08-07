import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const NewList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {newsByDate, deleteNew, submitting, target} = rootStore._newStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {newsByDate.map(_new => (
          <Item key={_new .id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{_new.title}</Item.Header>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{_new.description}</Item.Meta>
              <Item.Extra>
                <Button
                  as={Link} to={`/news/${_new.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={_new.id}
                  loading={target === _new.id && submitting}
                  onClick={(e) => deleteNew(e, _new.id)}
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

export default observer(NewList);
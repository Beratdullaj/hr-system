import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const MemoList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {memosByDate, deleteMemo, submitting, target} = rootStore.memoStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {memosByDate.map(memo => (
          <Item key={memo.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{memo.title}</Item.Header>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{memo.description}</Item.Meta>
              <Item.Extra>
                <Button
                  as={Link} to={`/memos/${memo.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={memo.id}
                  loading={target === memo.id && submitting}
                  onClick={(e) => deleteMemo(e, memo.id)}
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

export default observer(MemoList);

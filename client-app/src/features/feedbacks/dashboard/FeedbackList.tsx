import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const FeedbackList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {feedbacksByDate, deleteFeedback, submitting, target} = rootStore.feedbackStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {feedbacksByDate.map(feedback => (
          <Item key={feedback.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{feedback.name}</Item.Header>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{feedback.email}</Item.Meta>
              <Item.Meta style={{marginTop: '1em', width: '80%'}}>{feedback.message}</Item.Meta>
              <Item.Extra>
                <Button
                  as={Link} to={`/feedbacks/${feedback.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={feedback.id}
                  loading={target === feedback.id && submitting}
                  onClick={(e) => deleteFeedback(e, feedback.id)}
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

export default observer(FeedbackList);

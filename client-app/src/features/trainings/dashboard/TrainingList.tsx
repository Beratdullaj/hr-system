import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const TrainingList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {trainingsByDate, deleteTraining, submitting, target} = rootStore.trainingStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {trainingsByDate.map(training => (
          <Item key={training.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{training.type}</Item.Header>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{training.date}</Item.Meta>
              <Item.Extra>
                <Button
                  as={Link} to={`/trainings/${training.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={training.id}
                  loading={target === training.id && submitting}
                  onClick={(e) => deleteTraining(e, training.id)}
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

export default observer(TrainingList);

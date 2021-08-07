import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ScheduleList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {schedulesByDate, deleteSchedule, submitting, target} = rootStore.scheduleStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {schedulesByDate.map(schedule => (
          <Item key={schedule.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{schedule.day}</Item.Header>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{schedule.shift}</Item.Meta>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{schedule.start_Time}</Item.Meta>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{schedule.endTime}</Item.Meta>
              <Item.Extra>
                <Button
                  as={Link} to={`/schedules/${schedule.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={schedule.id}
                  loading={target === schedule.id && submitting}
                  onClick={(e) => deleteSchedule(e, schedule.id)}
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

export default observer(ScheduleList);

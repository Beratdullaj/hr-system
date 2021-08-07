import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const HolidayList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {holidaysByDate, deleteHoliday, submitting, target} = rootStore.holidayStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {holidaysByDate.map(holiday => (
          <Item key={holiday.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{holiday.type}</Item.Header>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{holiday.start_Date}</Item.Meta>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{holiday.end_Date}</Item.Meta>
              <Item.Extra>
                <Button
                  as={Link} to={`/holidays/${holiday.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={holiday.id}
                  loading={target === holiday.id && submitting}
                  onClick={(e) => deleteHoliday(e, holiday.id)}
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

export default observer(HolidayList);
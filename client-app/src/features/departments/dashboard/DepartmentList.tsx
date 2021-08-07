import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const DepartmentList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {departmentsByDate, deleteDepartment, submitting, target} = rootStore.departmentStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {departmentsByDate.map(department => (
          <Item key={department.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{department.name}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link} to={`/departments/${department.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={department.id}
                  loading={target === department.id && submitting}
                  onClick={(e) => deleteDepartment(e, department.id)}
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

export default observer(DepartmentList);

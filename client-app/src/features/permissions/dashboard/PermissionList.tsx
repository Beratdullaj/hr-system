import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const PermissionList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {permissionsByDate, deletePermission, submitting, target} = rootStore.permissionStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {permissionsByDate.map(permission => (
          <Item key={permission.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{permission.type}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link} to={`/permissions/${permission.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={permission.id}
                  loading={target === permission.id && submitting}
                  onClick={(e) => deletePermission(e, permission.id)}
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

export default observer(PermissionList);

import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const VehicleList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {vehiclesByDate, deleteVehicle, submitting, target} = rootStore.vehicleStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {vehiclesByDate.map(vehicle => (
          <Item key={vehicle.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{vehicle.type}</Item.Header><br/>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{vehicle.size}</Item.Meta>
              <Item.Extra>
                <Button
                  as={Link} to={`/vehicles/${vehicle.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={vehicle.id}
                  loading={target === vehicle.id && submitting}
                  onClick={(e) => deleteVehicle(e, vehicle.id)}
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

export default observer(VehicleList);
import React, { useContext } from 'react';
import { Item, Button,  Segment, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ServiceList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {servicesByDate, deleteService, submitting, target} = rootStore.serviceStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {servicesByDate.map(service => (
          <Item key={service.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{service.type}</Item.Header><br/>
              <Item.Meta style={{marginTop: '1em', width: '100%'}}>{service.description}</Item.Meta>
              <Image src='/assets/placeholder.png' size='medium' />
              <Item.Extra>
                <Button
                  as={Link} to={`/services/${service.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={service.id}
                  loading={target === service.id && submitting}
                  onClick={(e) => deleteService(e, service.id)}
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

export default observer(ServiceList);
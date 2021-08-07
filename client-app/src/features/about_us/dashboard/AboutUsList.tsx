import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const AboutUsList: React.FC = () => {
  const rootStore = useContext(RootStoreContext)
  const {about_usByDate, deleteAboutUs, submitting, target} = rootStore.aboutusStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {about_usByDate.map(aboutus => (
          <Item key={aboutus.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{aboutus.branchId}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link} to={`/about_us/${aboutus.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={aboutus.id}
                  loading={target === aboutus.id && submitting}
                  onClick={(e) => deleteAboutUs(e, aboutus.id)}
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

export default observer(AboutUsList);

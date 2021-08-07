import React, { useContext } from 'react';
import { Item, Button,  Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const TeamList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {teamsByDate, deleteTeam, submitting, target} = rootStore.teamStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {teamsByDate.map(team => (
          <Item key={team.id}>
            <Item.Content style={{display: 'flex'}}>
              <Item.Header style={{marginTop: '1em', width: '100%'}}>{team.name}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link} to={`/teams/${team.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={team.id}
                  loading={target === team.id && submitting}
                  onClick={(e) => deleteTeam(e, team.id)}
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

export default observer(TeamList);

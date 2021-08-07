import React, { useContext, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const TeamDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    team,
    loadTeam,
    loadingInitial,
  } = rootStore.teamStore;

  useEffect(() => {
    loadTeam(match.params.id);
  }, [loadTeam, match.params.id]);

  if(loadingInitial || !team) return <LoadingComponent content='Loading team...'/>

  return (
    <Card fluid >
      <Card.Content color={'grey'}>
        <Card.Header>{team!.name}</Card.Header>
        <Card.Meta>
          {team!.branchId}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2} >
          <Button
            as={Link} to ={`/team-manager/${team.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/teams')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(TeamDetails);
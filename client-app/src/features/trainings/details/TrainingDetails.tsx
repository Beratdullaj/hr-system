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

const TrainingDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    training,
    loadTraining,
    loadingInitial,
  } = rootStore.trainingStore;

  useEffect(() => {
    loadTraining(match.params.id);
  }, [loadTraining, match.params.id]);

  if(loadingInitial || !training) return <LoadingComponent content='Loading training...'/>

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{training!.type}</Card.Header>
        <Card.Meta><span>Date</span></Card.Meta>
        
        
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/training-manager/${training.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/trainings')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainingDetails);



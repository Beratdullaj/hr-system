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

const FeedbackDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    feedback,
    loadFeedback,
    loadingInitial,
  } = rootStore.feedbackStore;

  useEffect(() => {
    loadFeedback(match.params.id);
  }, [loadFeedback, match.params.id]);

  if(loadingInitial || !feedback) return <LoadingComponent content='Loading feedback...'/>

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{feedback!.name}</Card.Header>
        <Card.Header>{feedback!.email}</Card.Header>
        <Card.Description>{feedback!.message}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/feedback-manager/${feedback.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/feedbacks')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(FeedbackDetails);



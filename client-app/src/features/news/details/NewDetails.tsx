import React, { useContext, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import NewStore from "../../../app/stores/_newStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const NewDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    _new,
    loadNew,
    loadingInitial,
  } = rootStore._newStore;

  useEffect(() => {
    loadNew(match.params.id);
  }, [loadNew, match.params.id]);

  if(loadingInitial || !_new) return <LoadingComponent content='Loading new...'/>

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{_new!.title}</Card.Header>
        <Card.Description>{_new!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/newdetail-manager/${_new.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/news')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(NewDetails);
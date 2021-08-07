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

const MemoDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    memo,
    loadMemo,
    loadingInitial,
  } = rootStore.memoStore;

  useEffect(() => {
    loadMemo(match.params.id);
  }, [loadMemo, match.params.id]);

  if(loadingInitial || !memo) return <LoadingComponent content='Loading memo...'/>

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{memo!.title}</Card.Header>
        <Card.Description>{memo!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/memo-manager/${memo.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/memos')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(MemoDetails);



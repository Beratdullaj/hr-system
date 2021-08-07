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

const BranchDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { branch, loadBranch, loadingInitial } = rootStore.branchStore;

  useEffect(() => {
    loadBranch(match.params.id);
  }, [loadBranch, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading branch...' />;

  if (!branch) return <h2>Branch not found</h2>;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{branch!.location}</Card.Header>
        <Card.Meta>{branch!.distributions}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link}
            to={`/branch-manager/${branch.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push("/branches")}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(BranchDetails);

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

const DistributionDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {

  const rootStore = useContext(RootStoreContext);

  const {
    distribution,
    loadDistribution,
    loadingInitial,
  } = rootStore.distributionStore;

  useEffect(() => {
    loadDistribution(match.params.id);
  }, [loadDistribution, match.params.id]);

  if (loadingInitial) return <LoadingComponent content='Loading Distribution...' />;

  if (!distribution) return <h2>Distribution not found</h2>;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{distribution!.id}</Card.Header>
        <Card.Meta>
          {distribution!.branchid}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/distribution-manager/${distribution.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/distributions')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(DistributionDetails);

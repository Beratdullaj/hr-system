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

const ContractDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    contract,
    loadContract,
    loadingInitial,
  } = rootStore.contractStore;

  useEffect(() => {
    loadContract(match.params.id);
  }, [loadContract, match.params.id]);

  if (loadingInitial) return <LoadingComponent content='Loading contract...' />;

  if (!contract) return <h2>Contact not found</h2>;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{contract!.salary}</Card.Header>
        <Card.Meta>
          {contract!.signed_date}
        </Card.Meta>
        <Card.Meta>
          {contract!.expire_date}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/contract-manager/${contract.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/contracts')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ContractDetails);

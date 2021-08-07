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

const StockRequestDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    stockrequest,
    loadStockRequest,
    loadingInitial,
  } = rootStore.stockrequestStore;

  useEffect(() => {
    loadStockRequest(match.params.id);
  }, [loadStockRequest, match.params.id]);

  if (loadingInitial) return <LoadingComponent content='Loading stockrequest...' />;

  if (!stockrequest) return <h2>StockRequest not found</h2>;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{stockrequest!.quantity}</Card.Header>
        <Card.Meta>
          {stockrequest!.branchId}
          {stockrequest!.vehicleId}
          {stockrequest!.productId}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/stockrequest-manager/${stockrequest.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/stockrequests')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(StockRequestDetails);

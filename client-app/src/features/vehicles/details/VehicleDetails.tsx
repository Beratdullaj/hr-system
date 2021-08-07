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

const VehicleDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    vehicle,
    loadVehicle,
    loadingInitial,
  } = rootStore.vehicleStore;

  useEffect(() => {
    loadVehicle(match.params.id);
  }, [loadVehicle, match.params.id]);

  if(loadingInitial || !vehicle) return <LoadingComponent content='Loading vehicle...'/>

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{vehicle!.type}</Card.Header>
        <Card.Meta>{vehicle!.size}</Card.Meta>        
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/vehicle-manager/${vehicle.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/vehicles')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(VehicleDetails);
import React, { useContext, useEffect } from "react";
import { Card, Button, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ServiceDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    service,
    loadService,
    loadingInitial,
  } = rootStore.serviceStore;

  useEffect(() => {
    loadService(match.params.id);
  }, [loadService, match.params.id]);

  if(loadingInitial || !service) return <LoadingComponent content='Loading service...'/>

  return (
    <Card fluid>
      <Image src='/assets/placeholder.png' size='medium' />
      <Card.Content>
        
        <Card.Header>{service!.type}</Card.Header>
        <Card.Description>{service!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/service-manager/${service.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/services')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ServiceDetails);
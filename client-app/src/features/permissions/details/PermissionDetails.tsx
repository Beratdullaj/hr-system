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

const PermissionDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    permission,
    loadPermission,
    loadingInitial,
  } = rootStore.permissionStore;

  useEffect(() => {
    loadPermission(match.params.id);
  }, [loadPermission, match.params.id]);

  if (loadingInitial) return <LoadingComponent content='Loading Permission...' />;

  if (!permission) return <h2>Permission not found</h2>;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{permission!.type}</Card.Header>
        <Card.Description>{permission!.description}</Card.Description>
        <Card.Meta>
          <div>Role - {permission!.role}</div>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/manages/${permission.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/permissions')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(PermissionDetails);

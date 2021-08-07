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

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    department,
    loadDepartment,
    loadingInitial,
  } = rootStore.departmentStore;

  useEffect(() => {
    loadDepartment(match.params.id);
  }, [loadDepartment, match.params.id]);

  if (loadingInitial) return <LoadingComponent content='Loading department...' />;

  if (!department) return <h2>Department not found</h2>;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{department!.name}</Card.Header>
        <Card.Description>{department!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/manage/${department.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/departments')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);

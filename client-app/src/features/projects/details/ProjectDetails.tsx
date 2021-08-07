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

const ProjectDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    project,
    loadProject,
    loadingInitial,
  } = rootStore.projectStore;

  useEffect(() => {
    loadProject(match.params.id);
  }, [loadProject, match.params.id]);

  if (loadingInitial) return <LoadingComponent content='Loading project...' />;

  if (!project) return <h2>Project not found</h2>;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{project!.title}</Card.Header>
        <Card.Description>
          {project!.description}
        </Card.Description>
        <Card.Meta>
          {project!.due_Date}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
      <Button.Group widths={2}>
          <Button
            as={Link} to ={`/project-manager/${project.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/projects')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ProjectDetails);

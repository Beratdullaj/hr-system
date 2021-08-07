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

const AboutUsDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    aboutus,
    loadAboutUs,
    loadingInitial,
  } = rootStore.aboutusStore;

  useEffect(() => {
    loadAboutUs(match.params.id);
  }, [loadAboutUs, match.params.id]);

  if(loadingInitial || !aboutus) return <LoadingComponent content='Loading about us...'/>

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{aboutus!.Branch}</Card.Header>
        <Card.Meta>{aboutus!.BranchId}</Card.Meta>
        <Card.Header>{aboutus!.Service}</Card.Header>
        <Card.Meta>{aboutus!.ServiceId}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/manage-about_us/${aboutus.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/about_us')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(AboutUsDetails);

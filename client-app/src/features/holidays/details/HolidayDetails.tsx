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

const HolidayDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    holiday,
    loadHoliday,
    loadingInitial,
  } = rootStore.holidayStore;

  useEffect(() => {
    loadHoliday(match.params.id);
  }, [loadHoliday, match.params.id]);

  if(loadingInitial || !holiday) return <LoadingComponent content='Loading holiday...'/>

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{holiday!.type}</Card.Header>
        <Card.Description>{holiday!.Start_Date}</Card.Description>
        <Card.Description>{holiday!.End_Date}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/holiday-manager/${holiday.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/holidays')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(HolidayDetails);
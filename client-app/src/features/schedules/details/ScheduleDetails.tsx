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

const ScheduleDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    schedule,
    loadSchedule,
    loadingInitial,
  } = rootStore.scheduleStore;

  useEffect(() => {
    loadSchedule(match.params.id);
  }, [loadSchedule, match.params.id]);

  if(loadingInitial || !schedule) return <LoadingComponent content='Loading schedule...'/>

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{schedule!.day}</Card.Header>
        <Card.Description>{schedule!.shift}</Card.Description>
        <Card.Description>{schedule!.start_time}</Card.Description>
        <Card.Description>{schedule!.endTime}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to ={`/schedule-manager/${schedule.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/schedules')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ScheduleDetails);

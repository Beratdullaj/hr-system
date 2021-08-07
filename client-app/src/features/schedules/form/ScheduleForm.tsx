import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { ISchedule } from "../../../app/models/schedule";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ScheduleForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);;
  const {
    createSchedule,
    editSchedule,
    submitting,
    schedule: initialFormState,
    clearSchedule
  } = rootStore.scheduleStore;


  
  const {
    loadSchedule
  } = rootStore.scheduleStore;

  const [schedule, setSchedule] = useState<ISchedule>({
    id: "",
    day: "",
    shift: "",
    start_time: "",
    endTime: "",
  });

  useEffect(() => {
    if (match.params.id && schedule.id.length === 0) {
      loadSchedule(match.params.id).then(
        () => initialFormState && setSchedule(initialFormState)
      );
    }
    return () => {
      clearSchedule();
    }
  }, [loadSchedule, clearSchedule, match.params.id, initialFormState, schedule.id.length]);


  const handleSubmit = () => {
    if (schedule.id.length === 0) {
      let newSchedule = {
        ...schedule,
        id: uuid(),
      };
      createSchedule(newSchedule).then(() => history.push(`/schedules/${newSchedule.id}`));
    } else {
      editSchedule(schedule).then(() => history.push(`/schedules/${schedule.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setSchedule({ ...schedule, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="day"
          placeholder="Dita"
          value={schedule.day}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="shift"
          rows={2}
          placeholder="Orari"
          value={schedule.shift}
        />
        <Form.Input
          onChange={handleInputChange}
          name="start_time"
          type="datetime-local"
          placeholder="Fillon"
          value={schedule.start_time}
        />
        <Form.Input
          onChange={handleInputChange}
          name="endTime"
          type="datetime-local"
          placeholder="Mbaron"
          value={schedule.endTime}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/schedules')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ScheduleForm);
import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IHoliday } from "../../../app/models/holiday";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const HolidayForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHoliday,
    editHoliday,
    submitting,
    holiday: initialFormState,
    clearHoliday
  } = rootStore.holidayStore;


  

  const {
    loadHoliday
  } = rootStore.holidayStore;
  const [holiday, setHoliday] = useState<IHoliday>({
    id: "",
    type: "",
    Start_Date: "",
    End_Date: "",
  });

  useEffect(() => {
    if (match.params.id && holiday.id.length === 0) {
      loadHoliday(match.params.id).then(
        () => initialFormState && setHoliday(initialFormState)
      );
    }
    return () => {
      clearHoliday();
    }
  }, [loadHoliday, clearHoliday, match.params.id, initialFormState, holiday.id.length]);


  const handleSubmit = () => {
    if (holiday.id.length === 0) {
      let newhHoliday = {
        ...holiday,
        id: uuid(),
      };
      createHoliday(newhHoliday).then(() => history.push(`/holidays/${newhHoliday.id}`));
    } else {
      editHoliday(holiday).then(() => history.push(`/holidays/${holiday.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setHoliday({ ...holiday, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="type"
          placeholder="Lloji"
          value={holiday.type}
        />
        <Form.Input
          onChange={handleInputChange}
          name="Start_Date"
          type='datetime-local'
          placeholder="Fillon"
          value={holiday.Start_Date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="End_Date"
          type='datetime-local'
          placeholder="Mbaron"
          value={holiday.End_Date}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/holidays')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(HolidayForm);
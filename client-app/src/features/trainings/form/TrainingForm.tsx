import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { ITraining } from "../../../app/models/training";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const TrainingForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createTraining,
    editTraining,
    submitting,
    training: initialFormState,
    clearTraining
  } = rootStore.trainingStore;

  const {
    loadTraining
  } = rootStore.trainingStore;
  const [training, setTraining] = useState<ITraining>({
    id: "",
    type: "",
    date: "",
  });

  useEffect(() => {
    if (match.params.id && training.id.length === 0) {
      loadTraining(match.params.id).then(
        () => initialFormState && setTraining(initialFormState)
      );
    }
    return () => {
      clearTraining();
    }
  }, [loadTraining, clearTraining, match.params.id, initialFormState, training.id.length]);


  const handleSubmit = () => {
    if (training.id.length === 0) {
      let newTraining = {
        ...training,
        id: uuid(),
      };
      createTraining(newTraining).then(() => history.push(`/trainings/${newTraining.id}`));
    } else {
      editTraining(training).then(() => history.push(`/trainings/${training.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setTraining({ ...training, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="type"
          placeholder="Tipi"
          value={training.type}
        />
        <Form.Input
          onChange={handleInputChange}
          type='date'
          name="Date"
          rows={2}
          placeholder="Data"
          value={training.date}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/trainings')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(TrainingForm);

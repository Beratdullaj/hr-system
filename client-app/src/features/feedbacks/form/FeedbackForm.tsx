import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IFeedback} from "../../../app/models/feedback";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const FeedbackForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createFeedback,
    editFeedback,
    submitting,
    feedback: initialFormState,
    clearFeedback
  } = rootStore.feedbackStore;

  const {
    loadFeedback
  } = rootStore.feedbackStore;
  const [feedback, setFeedback] = useState<IFeedback>({
    id: "",
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (match.params.id && feedback.id.length === 0) {
      loadFeedback(match.params.id).then(
        () => initialFormState && setFeedback(initialFormState)
      );
    }
    return () => {
      clearFeedback();
    }
  }, [loadFeedback, clearFeedback, match.params.id, initialFormState, feedback.id.length]);


  const handleSubmit = () => {
    if (feedback.id.length === 0) {
      let newFeedback = {
        ...feedback,
        id: uuid(),
      };
      createFeedback(newFeedback).then(() => history.push(`/feedbacks/${newFeedback.id}`));
    } else {
      editFeedback(feedback).then(() => history.push(`/feedbacks/${feedback.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setFeedback({ ...feedback, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Emri"
          value={feedback.name}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="email"
          rows={2}
          placeholder="E-mail"
          value={feedback.email}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="message"
          rows={2}
          placeholder="Mesazhi"
          value={feedback.message}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/feedbacks')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(FeedbackForm);

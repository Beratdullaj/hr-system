import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IMemo } from "../../../app/models/memo";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const MemoForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createMemo,
    editMemo,
    submitting,
    memo: initialFormState,
    clearMemo
  } = rootStore.memoStore;

  const {
    loadMemo
  } = rootStore.memoStore;
  const [memo, setMemo] = useState<IMemo>({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (match.params.id && memo.id.length === 0) {
      loadMemo(match.params.id).then(
        () => initialFormState && setMemo(initialFormState)
      );
    }
    return () => {
      clearMemo();
    }
  }, [loadMemo, clearMemo, match.params.id, initialFormState, memo.id.length]);


  const handleSubmit = () => {
    if (memo.id.length === 0) {
      let newMemo = {
        ...memo,
        id: uuid(),
      };
      createMemo(newMemo).then(() => history.push(`/memos/${newMemo.id}`));
    } else {
      editMemo(memo).then(() => history.push(`/memos/${memo.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setMemo({ ...memo, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Titulli"
          value={memo.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={memo.description}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/memos')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(MemoForm);

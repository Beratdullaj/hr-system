import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { INew } from "../../../app/models/_new";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const NewForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
  }) => {
    const rootStore = useContext(RootStoreContext);;
    const {
      createNew,
      editNew,
      submitting,
      _new: initialFormState,
      clearNew
    } = rootStore._newStore;

    const {
      loadNew
    } = rootStore._newStore;
  const [ _new, setNew] = useState<INew>({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (match.params.id && _new.id.length === 0) {
      loadNew(match.params.id).then(
        () => initialFormState && setNew(initialFormState)
      );
    }
    return () => {
      clearNew();
    }
  }, [loadNew, clearNew, match.params.id, initialFormState, _new.id.length]);


  const handleSubmit = () => {
    if (_new.id.length === 0) {
      let newNew = {
        ..._new,
        id: uuid(),
      };
      createNew(newNew).then(() => history.push(`/news/${newNew.id}`));
    } else {
      editNew(_new).then(() => history.push(`/news/${_new.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNew({ ..._new, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Name"
          value={_new.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={_new.description}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/news')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(NewForm);
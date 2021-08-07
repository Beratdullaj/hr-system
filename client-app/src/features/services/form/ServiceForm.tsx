import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IService } from "../../../app/models/service";
import { v4 as uuid } from "uuid";
import ServiceStore from "../../../app/stores/serviceStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ServiceForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createService,
    editService,
    submitting,
    service: initialFormState,
    loadService,
    clearService
  } = rootStore.serviceStore;

  const [service, setService] = useState<IService>({
    id: "",
    type: "",
    description: "",
    photo: "",
  });

  useEffect(() => {
    if (match.params.id && service.id.length === 0) {
      loadService(match.params.id).then(
        () => initialFormState && setService(initialFormState)
      );
    }
    return () => {
      clearService();
    }
  }, [loadService, clearService, match.params.id, initialFormState, service.id.length]);


  const handleSubmit = () => {
    if (service.id.length === 0) {
      let newService = {
        ...service,
        id: uuid(),
      };
      createService(newService).then(() => history.push(`/services/${newService.id}`));
    } else {
      editService(service).then(() => history.push(`/services/${service.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setService({ ...service, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="type"
          placeholder="Tipi i sherbimit"
          value={service.type}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Pershkrimi"
          value={service.description}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/services')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ServiceForm);
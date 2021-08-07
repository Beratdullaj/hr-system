import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IDepartment } from "../../../app/models/department";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const DepartmentForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createDepartment,
    editDepartment,
    submitting,
    loadDepartment,
  } = rootStore.departmentStore;


  


  const [department, setDepartment] = useState<IDepartment>({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (match.params.id) {
      loadDepartment(match.params.id).then(
        (product) =>  setDepartment(product)
      );
    }
  }, [
    loadDepartment,
    match.params.id,
  ]);


  const handleSubmit = () => {
    if (department.id.length === 0) {
      let newDepartment = {
        ...department,
        id: uuid(),
      };
      createDepartment(newDepartment).then(() => history.push(`/departments/${newDepartment.id}`));
    } else {
      editDepartment(department).then(() => history.push(`/departments/${department.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setDepartment({ ...department, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          value={department.name}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={department.description}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/departments')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(DepartmentForm);

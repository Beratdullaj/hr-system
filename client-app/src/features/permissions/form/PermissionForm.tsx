import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IPermission } from "../../../app/models/permission";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const PermissionForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createPermission,
    editPermission,
    submitting,
    loadPermission,
  } = rootStore.permissionStore;

  const [permission, setPermission] = useState<IPermission>({
    id: "",
    type: "",
    description: "",
    role: 0
  });

  useEffect(() => {
    if (match.params.id) {
      loadPermission(match.params.id).then(
        (product) =>  setPermission(product)
      );
    }
  }, [
    loadPermission,
    match.params.id,
  ]);

  const handleSubmit = () => {
    if (permission.id.length === 0) {
      let newPermission = {
        ...permission,
        id: uuid(),
      };
      createPermission(newPermission).then(() =>
        history.push(`/permissions/${newPermission.id}`)
      );
    } else {
      editPermission(permission).then(() =>
        history.push(`/permissions/${permission.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setPermission({ ...permission, [name]: value });
  };


  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="type"
          placeholder="Type"
          value={permission.type}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={permission.description}
        />
        
        <Form.Input
          onChange={handleInputChange}
          name="role"
          placeholder="Role"
          value={permission.role}
        />

        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push("/permissions")}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(PermissionForm);

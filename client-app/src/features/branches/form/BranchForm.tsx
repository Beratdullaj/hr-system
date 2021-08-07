import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IBranch } from "../../../app/models/branch";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const BranchForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createBranch,
    editBranch,
    submitting,
    loadBranch,
  } = rootStore.branchStore;

  const [branch, setBranch] = useState<IBranch>({
    id: "",
    location: "",
    teams: "",
    distributions: "",
    about_uss: "",
    stockRequest:""
  });
  useEffect(() => {
    if (match.params.id) {
      loadBranch(match.params.id).then(
        (product) =>  setBranch(product)
      );
    }
  }, [
    setBranch,
    match.params.id,
    loadBranch
  ]);


  const handleSubmit = () => {
    if (branch.id.length === 0) {
      let newBranch = {
        ...branch,
        id: uuid(),
      };
      console.log(newBranch);
      createBranch(newBranch).then(() => history.push(`/branches/${newBranch.id}`));
    } else {
      editBranch(branch).then(() => history.push(`/branches/${branch.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setBranch({ ...branch, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="location"
          placeholder="Location"
          value={branch.location}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/branches')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(BranchForm);

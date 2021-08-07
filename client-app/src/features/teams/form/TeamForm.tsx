import React, { useState, FormEvent, useContext, useEffect, SyntheticEvent } from "react";
import { Segment, Form, Button, DropdownProps } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { ITeam } from "../../../app/models/team";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";


interface DetailParams {
  id: string;
}

const TeamForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createTeam,
    editTeam,
    submitting,
    loadTeam,
  } = rootStore.teamStore;

  const {
    loadBranch
  } = rootStore.branchStore;
  const [team, setTeam] = useState<ITeam>({
    id: "",
    name: "",
    branchId: "",
    branch: "",
    projects: ""
  });
  useEffect(() => {
    if (match.params.id) {
      loadTeam(match.params.id).then(
        (product) =>  setTeam(product)
      );
    }
  }, [
    loadTeam,
    match.params.id,
  ]);

  useEffect(() => {
    if (match.params.id) {
      loadBranch(match.params.id)
    }
  }, [
    loadBranch,
    match.params.id,
  ]);

  const options = new Array();

  const branch = rootStore.branchStore.branchesByDate;
  {branch.map(branch => (
    options.push({"key": branch.location, "value": branch.id,"text":branch.location})
   ))}


  const handleSubmit = () => {
    if (team.id.length === 0) {
      let newTeam = {
        ...team,
        id: uuid(),
      };
      console.log(newTeam);
      createTeam(newTeam).then(() => history.push(`/teams/${newTeam.id}`));
    } else {
      editTeam(team).then(() => history.push(`/teams/${team.id}`));
    }
  };

  const handleDropDown = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps)=> {

    setTeam({ ...team, ["branchId"]: String(data.value)});
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setTeam({ ...team, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          value={team.name}
        />
        <Form.Select
          onChange={handleDropDown}
          fluid
          label='Branch'
          options={options}
          placeholder='Branch'
          name="branchId"
          required
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/teams')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(TeamForm);

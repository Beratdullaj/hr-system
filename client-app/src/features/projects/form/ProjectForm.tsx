import React, { useState, FormEvent, useContext, useEffect, SyntheticEvent } from "react";
import { Segment, Form, Button, DropdownProps } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IProject } from "../../../app/models/project";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";


interface DetailParams {
  id: string;
}

const ProjectForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createProject,
    editProject,
    submitting,
    loadProject,
  } = rootStore.projectStore;

  const {
    loadTeam
  } = rootStore.teamStore;

  const [project, setProject] = useState<IProject>({
    id : "",
    title : "",
    description : "",
    due_Date : "",
    teamid : "" ,
    team :""
  });
  useEffect(() => {
    if (match.params.id) {
      loadProject(match.params.id).then(
        (product) =>  setProject(product)
      );
    }
  }, [
    loadProject,
    match.params.id,
  ]);

  useEffect(() => {
    if (match.params.id) {
      loadTeam(match.params.id)
    }
  }, [
    loadTeam,
    match.params.id,
  ]);

  const options = new Array();

  const team = rootStore.teamStore.teamsByDate;
  {team.map(team => (
    options.push({"key": team.location, "value": team.id,"text":team.location})
   ))}


  const handleSubmit = () => {
    if (project.id.length === 0) {
      let newProject = {
        ...project,
        id: uuid(),
      };
      console.log(newProject);
      createProject(newProject).then(() => history.push(`/projects/${newProject.id}`));
    } else {
      editProject(project).then(() => history.push(`/projects/${project.id}`));
    }
  };

  const handleDropDown = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps)=> {

    setProject({ ...project, ["teamid"]: String(data.value)});
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProject({ ...project, [name]: value });
  };

  return (
    <Segment clearing>
        <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="title"
          value={project.title}
        />
        <Form.Input
          onChange={handleInputChange}
          name="description"
          placeholder="Description"
          value={project.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="due_Date"
          placeholder="Due Date"
          type="datetime-local"
          value={project.due_Date}
        />
        <Form.Select
          onChange={handleDropDown}
          fluid
          label='Team'
          options={options}
          placeholder='Team'
          name="teamid"
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
          onClick={() => history.push('/projects')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ProjectForm);

import React, { useState, FormEvent, useContext, useEffect, SyntheticEvent } from "react";
import { Segment, Form, Button, DropdownProps } from "semantic-ui-react";
import { IAboutUs } from "../../../app/models/aboutus";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const AboutUsForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createAboutUs,
    editAboutUs,
    submitting,
    aboutus: initialFormState,
    clearAboutUs
  } = rootStore.aboutusStore;

  const {
    loadAboutUs
  } = rootStore.aboutusStore;
  const [aboutus, setAboutUs] = useState<IAboutUs>({
    id: "",
    BranchId: "",
    Branch: "",
    ServiceId: "",
    Service: "",
  });

  useEffect(() => {
    if (match.params.id && aboutus.id.length === 0) {
      loadAboutUs(match.params.id).then(
        () => initialFormState && setAboutUs(initialFormState)
      );
    }
    return () => {
      clearAboutUs();
    }
  }, [loadAboutUs, clearAboutUs, match.params.id, initialFormState, aboutus.id.length]);

  useEffect(() => {
    rootStore.branchStore.loadBranches();
   }, [rootStore.branchStore]);

   const options = new Array();

   const branch = rootStore.branchStore.branchesByDate;
  {branch.map(branch => (
    options.push({"key": branch.location, "value": branch.id,"text":branch.location})
   ))}
   

   useEffect(() => {
    rootStore.serviceStore.loadServices();
   }, [rootStore.serviceStore]);

   const select = new Array();

   const service = rootStore.serviceStore.servicesByDate;
  {service.map(service => (
    select.push({"key": service.type, "value": service.id,"text":service.type})
   ))}

  
  const handleSubmit = () => {
    if (aboutus.id.length === 0) {
      let newAboutUs = {
        ...aboutus,
        id: uuid(),
      };
      createAboutUs(newAboutUs).then(() => history.push(`/aboutus/${newAboutUs.id}`));
    } else {
      editAboutUs(aboutus).then(() => history.push(`/aboutus/${aboutus.id}`));
    }
  };

  const handleDropDown = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps)=> {

    setAboutUs({ ...aboutus, ["BranchId"]: String(data.value)});
    setAboutUs({ ...aboutus, ["ServiceId"]: String(data.value)});
  };

  // const handleInputChange = (
  //   event: FormEvent<HTMLInputElement>
  // ) => {
  //   const { name, value } = event.currentTarget;
  //   setAboutUs({ ...aboutus, [name]: value });
  // };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Select
              onChange={handleDropDown}
              fluid
              label='Branch'
              options={options}
              placeholder='Branch'
              name="branchId"
        />
        <Form.Select
              onChange={handleDropDown}
              fluid
              label='Service'
              options={select}
              placeholder='Service'
              name="ServiceId"
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/aboutus')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(AboutUsForm);

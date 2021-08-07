import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IContract } from "../../../app/models/contract";
import { RootStoreContext } from "../../../app/stores/rootStore";
interface DetailParams {
  id: string;
}

const ContractForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createContract,
    editContract,
    submitting,
    loadContract,
  } = rootStore.contractStore;

  const [contract, setContract] = useState<IContract>({
    id: "",
    salary: "",
    signed_date: "",
    expire_date: ""
  });
  useEffect(() => {
    if (match.params.id) {
      loadContract(match.params.id).then(
        (product) =>  setContract(product)
      );
    }
  }, [
    loadContract,
    match.params.id,
  ]);

  const handleSubmit = () => {
    if (contract.id.length === 0) {
      let newContract = {
        ...contract,
        id: uuid(),
      };
      console.log(newContract);
      createContract(newContract).then(() => history.push(`/contracts/${newContract.id}`));
    } else {
      editContract(contract).then(() => history.push(`/contracts/${contract.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setContract({ ...contract, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="salary"
          placeholder="Salary"
          value={contract.salary}
        />
        <Form.Input
          onChange={handleInputChange}
          name='signed_date'
          type='datetime-local'
          placeholder='Signed Date'
          value={contract.signed_date}
        />
        <Form.Input
          onChange={handleInputChange}
          name='expire_date'
          type='datetime-local'
          placeholder='Expire Date'
          value={contract.expire_date}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/contracts')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ContractForm);

import React, { useState, FormEvent, useContext, useEffect, SyntheticEvent } from "react";
import { Segment, Form, Button, DropdownProps } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import DistributionStore from "../../../app/stores/distributionStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IDistribution } from "../../../app/models/distribution";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";


interface DetailParams {
  id: string;
}

const DistributionForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    createDistribution,
    editDistribution,
    submitting,
    loadDistribution,
    clearDistribution
  } = rootStore.distributionStore;

  const   {
    loadBranch
  } = rootStore.branchStore;

  const  {
    loadVehicle
  } = rootStore.vehicleStore;

  const  {
    loadProduct
  } = rootStore.productStore;

  const [distribution, setDistribution] = useState<IDistribution>({
    id :"",
    productid :"",
    product:"",
    branchid :"",
    branch :"",
    vehicleid:"",
    vehicles:""
  });

  useEffect(() => {
    if (match.params.id) {
      loadDistribution(match.params.id).then(
        (product) =>  setDistribution(product)
      );
    }
  }, [
    loadDistribution,
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

  useEffect(() => {
    if (match.params.id) {
      loadVehicle(match.params.id)
    }
  }, [
    loadVehicle,
    match.params.id,
  ]);

  useEffect(() => {
    if (match.params.id) {
      loadProduct(match.params.id)
    }
  }, [
    loadProduct,
    match.params.id,
  ]);

  const options = new Array();
  const optionsVehicle = new Array();
  const optionsProduct = new Array();

  const branch = rootStore.branchStore.branchesByDate;
  const vehicle = rootStore.vehicleStore.vehiclesByDate;
  const product = rootStore.productStore.productsByDate;


  {branch.map(branch => (
    options.push({"key": branch.location, "value": branch.id,"text":branch.location})
   ))}

  {vehicle.map(vehicle => (
    options.push({"key": vehicle.type, "value": vehicle.id,"text":vehicle.type})
   ))}

  {product.map(product => (
    options.push({"key": product.name, "value": product.id,"text":product.name})
   ))}


  const handleSubmit = () => {
    if (distribution.id.length === 0) {
      let newDistribution = {
        ...distribution,
        id: uuid(),
      };
      console.log(newDistribution);
      createDistribution(newDistribution).then(() => history.push(`/distributions/${newDistribution.id}`));
    } else {
      editDistribution(distribution).then(() => history.push(`/distributions/${distribution.id}`));
    }
  };

  const handleDropDown = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps)=> {

    setDistribution({ ...distribution, ["branchid"]: String(data.value)});
    setDistribution({ ...distribution, ["vehicleid"]: String(data.value)});
    setDistribution({ ...distribution, ["productid"]: String(data.value)});

  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setDistribution({ ...distribution, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Select
          onChange={handleDropDown}
          fluid
          label='Branch'
          options={options}
          placeholder='Branch'
          name="branchid"
          required
        />
        <Form.Select
          onChange={handleDropDown}
          fluid
          label='Vehicle'
          options={optionsVehicle}
          placeholder='Vehicle'
          name="vehicleid"
          required
        />
        <Form.Select
          onChange={handleDropDown}
          fluid
          label='Product'
          options={optionsProduct}
          placeholder='Product'
          name="productid"
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
          onClick={() => history.push('/distributions')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(DistributionForm);



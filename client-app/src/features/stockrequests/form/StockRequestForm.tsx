import React, { useState, FormEvent, useContext, useEffect, SyntheticEvent } from "react";
import { Segment, Form, Button, DropdownProps } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import StockRequestStore from "../../../app/stores/stockrequestStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IStockRequest } from "../../../app/models/stockrequest";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";


interface DetailParams {
  id: string;
}

const StockRequestForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    createStockRequest,
    editStockRequest,
    submitting,
    loadStockRequest,
    clearStockRequest
  } = rootStore.stockrequestStore;

  const   {
    loadBranch
  } = rootStore.branchStore;

  const  {
    loadVehicle
  } = rootStore.vehicleStore;

  const  {
    loadProduct
  } = rootStore.productStore;

  const [stockrequest, setStockRequest] = useState<IStockRequest>({
    id: "",
    quantity:"",
    product: "",
    branch: "",
    vehicle: "",
    productId: "",
    vehicleId: "",
    branchId: ""
  });

  useEffect(() => {
    if (match.params.id) {
      loadStockRequest(match.params.id).then(
        (product) =>  setStockRequest(product)
      );
    }
  }, [
    loadStockRequest,
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
    if (stockrequest.id.length === 0) {
      let newStockRequest = {
        ...stockrequest,
        id: uuid(),
      };
      console.log(newStockRequest);
      createStockRequest(newStockRequest).then(() => history.push(`/stockrequests/${newStockRequest.id}`));
    } else {
      editStockRequest(stockrequest).then(() => history.push(`/stockrequests/${stockrequest.id}`));
    }
  };

  const handleDropDown = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps)=> {

    setStockRequest({ ...stockrequest, ["branchId"]: String(data.value)});
    setStockRequest({ ...stockrequest, ["vehicleId"]: String(data.value)});
    setStockRequest({ ...stockrequest, ["productId"]: String(data.value)});

  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setStockRequest({ ...stockrequest, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          value={stockrequest.quantity}
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
        <Form.Select
          onChange={handleDropDown}
          fluid
          label='Vehicle'
          options={optionsVehicle}
          placeholder='Vehicle'
          name="vehicleId"
          required
        />
        <Form.Select
          onChange={handleDropDown}
          fluid
          label='Product'
          options={optionsProduct}
          placeholder='Product'
          name="productId"
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
          onClick={() => history.push('/stockrequests')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(StockRequestForm);



import React, { useState, FormEvent, useContext, useEffect, SyntheticEvent } from "react";
import { Segment, Form, Button, DropdownProps } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IVehicle } from "../../../app/models/vehicle";
import { RootStore, RootStoreContext } from "../../../app/stores/rootStore";


interface DetailParams {
  id: string;
}

const VehicleForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createVehicle,
    editVehicle,
    submitting,
    vehicle: initialFormState,
    clearVehicle
  } = rootStore.vehicleStore;

  const {
    loadVehicle
  } = rootStore.vehicleStore;
  const [vehicle, setVehicle] = useState<IVehicle>({
    id: "",
    type: "",
    size: "",
  });

  useEffect(() => {
    if (match.params.id && vehicle.id.length === 0) {
      loadVehicle(match.params.id).then(
        () => initialFormState && setVehicle(initialFormState)
      );
    }
    return () => {
      clearVehicle();
    }
  }, [loadVehicle, clearVehicle, match.params.id, initialFormState, vehicle.id.length]);


  const handleSubmit = () => {
    if (vehicle.id.length === 0) {
      let newVehicle = {
        ...vehicle,
        id: uuid(),
      };
      createVehicle(newVehicle).then(() => history.push(`/vehicles/${newVehicle.id}`));
    } else {
      editVehicle(vehicle).then(() => history.push(`/vehicles/${vehicle.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setVehicle({ ...vehicle, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="type"
          placeholder="Tipi"
          value={vehicle.type}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="size"
          rows={2}
          placeholder="Madhesia"
          value={vehicle.size}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/vehicles')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(VehicleForm);
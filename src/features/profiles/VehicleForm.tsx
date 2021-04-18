import React, { useContext } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  isRequired
} from "revalidate";
import TextInput from "../../app/Common/form/TextInput";
import TextAreaInput from "../../app/Common/form/TextAreaInput";
import { RootStoreContext } from "../../app/stores/rootStore";

import { configure } from "mobx";
configure({
  enforceActions: "never",
});
const validate = combineValidators({
  //   registration: isRequired({ message: 'car registration is required' }),
  carModel: isRequired("Car model"),
  //   description: composeValidators(
  //     isRequired('Description'),
  //     hasLengthGreaterThan(4)({
  //       message: 'Description needs to be at least 5 characters'
  //     })
  //   )(),
  carMake: isRequired("car Make"),
  vin: isRequired("Vin is required"),
  //time: isRequired('Time')
  // advertiserName
  // email
  // phoneNumber
});

const VehicleForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createVehicle,
    editVehicle,
    submitting,
    vehicle,
  } = rootStore.vehicleStore;

  const handleFinalFormSubmit = (values: any) => {
    if (!values.id) {
      createVehicle(values);
    } else {
      editVehicle(values);
    }
  };
  return (
    <Grid>
      <Grid.Column>
        <Segment clearing>
          <FinalForm
            initialValues={vehicle}
            validate={validate}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="registrationNumber"
                  placeholder="Registration Number"
                  value={vehicle?.registrationNumber}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Car Description"
                  value={vehicle?.description}
                  component={TextAreaInput}
                />
                <Field
                  name="registrationYear"
                  placeholder="Registration Year"
                  value={vehicle?.registrationYear}
                  component={TextInput}
                />

                <Field
                  name="carMake"
                  placeholder="Car Make"
                  value={vehicle?.carMake}
                  component={TextInput}
                />
                <Field
                  name="carModel"
                  placeholder="CarModel"
                  value={vehicle?.carModel}
                  rows={3}
                  component={TextInput}
                />

                <Field
                  name="bodyStyle"
                  placeholder="Body Style"
                  value={vehicle?.bodyStyle}
                  component={TextInput}
                />
                <Field
                  name="transmission"
                  placeholder="Transmission"
                  value={vehicle?.transmission}
                  rows={3}
                  component={TextInput}
                />
                <Field
                  name="fuelType"
                  placeholder="Fuel Type"
                  value={vehicle?.fuelType}
                  component={TextInput}
                />
                <Field
                  name="numberOfSeats"
                  placeholder="Number Of Seats"
                  value={vehicle?.numberOfSeats}
                  component={TextInput}
                />

                <Field
                  name="numberOfDoors"
                  placeholder="Number Of Doors"
                  value={vehicle?.numberOfDoors}
                  component={TextInput}
                />
                <Field
                  name="engineSize"
                  placeholder="Engine Size"
                  value={vehicle?.engineSize}
                  component={TextInput}
                />
                <Field
                  name="vin"
                  placeholder="Vin number"
                  value={vehicle?.vin}
                  rows={3}
                  component={TextInput}
                />
                {/* <Field
                  name="nctResults"
                  placeholder="NCT Results"
                  value={vehicle?.nctResults}
                  component={TextInput}
                /> */}
                <Button
                  loading={submitting}
                  disabled={invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                {/* <Button
                  onClick={
                    vehicle.id
                      ? () => history.push(`/vehicles/${vehicle.id}`)
                      : () => history.push("/vehicles")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                /> */}
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(VehicleForm);

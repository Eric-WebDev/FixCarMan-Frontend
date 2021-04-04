import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";

import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import { AdvertFormValues } from "../../app/models/advertsFixCar/adverts";
import { combineDateAndTime } from "../../app/Common/util/util";
import TextInput from "../../app/Common/form/TextInput";
import TextAreaInput from "../../app/Common/form/TextAreaInput";
import DateInput from "../../app/Common/form/DateInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IVehicleFormValues } from "../../app/models/profiles/profile";
import { FORM_ERROR } from "final-form";

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
  //   vin: isRequired('Vin is required'),
  //time: isRequired('Time')
  // advertiserName
  // email
  // phoneNumber
});

// interface DetailParams {
//   id: string;
// }

const VehicleForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createVehicle,
    submitting,
    loadUserVehicles,
    vehicle
  } = rootStore.vehicleStore;

  // const [vehicle] = useState(new IVehicleFormValues());
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (match.params.id) {
  //     setLoading(true);
  //     loadUserVehicles(match.params.id)
  //       .finally(() => setLoading(false));
  //   }
  // }, [loadUserVehicles, match.params.id]);

  // const handleFinalFormSubmit = (values: any) => {

  //   if (vehicle.id) {
  //     let newVehicle = {
  //      ...vehicle,

  //    };
  //     createVehicle(newVehicle);
  //   } else {
  //   //   editVehicle(vehicle);
  //   }
  // };

  return (
    <Grid>
      <Grid.Column>
        <Segment clearing>
          <FinalForm
            validate={validate}
            // initialValues={vehicle}
            onSubmit={(values: IVehicleFormValues) =>
              createVehicle(values).catch((error) => ({
                [FORM_ERROR]: error,
              }))
            }
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
                {/* <Field
                  name="numberOfSeats"
                  placeholder="Number Of Seats"
                  value={vehicle?.numberOfSeats}
                  component={TextInput}
                /> */}

                {/* <Field
                  name="numberOfDoors"
                  placeholder="Number Of Doors"
                  value={vehicle?.numberOfDoors}
                  component={TextInput}
                /> */}
                {/* <Field
                  name="engineSize"
                  placeholder="Engine Size"
                  value={vehicle?.engineSize}
                  component={TextInput}
                /> */}
                  {/* <Field
                  name="vin"
                  placeholder="Vin number"
                  value={vehicle?.vin}
                  rows={3}
                  component={TextInput}
                /> */}
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

import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { IUserFormValues } from "../../app/models/users/user";
import ErrorMessage from "../../app/Common/form/ErrorMessage";
import TextInput from "../../app/Common/form/TextInput";
import SelectInput from "../../app/Common/form/SelectInput";
export const typeProfile = [
  { key: "garage", text: "Garage", value: "garage" },
  { key: "user", text: "User", value: "user" },
];
const validate = combineValidators({
  username: isRequired("Username"),
  email: isRequired("Email"),
  password: isRequired("Password"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register, user } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" content="Sign up" color="blue" textAlign="center" />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          <Field
            component={SelectInput}
            options={typeProfile}
            name="UserGarage"
            placeholder="Profile type"
            value={user?.userGarage}
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="blue"
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;

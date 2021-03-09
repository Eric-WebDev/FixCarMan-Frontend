import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../app/Common/form/TextInput';
import TextAreaInput from '../../app/Common/form/TextAreaInput';
import { IProfile } from '../../app/models/profiles/profile';


const validate = combineValidators({
  //username: isRequired('username')
});

interface IProps {
  updateProfile: (profile: Partial<IProfile>) => void;
  profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
      onSubmit={updateProfile}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name='username'
            component={TextInput}
            placeholder='User Name'
            value={profile!.username}
          />
          <Field
            name='firstName'
            component={TextInput}
            placeholder='First Name'
            value={profile!.firstName}
          />
          <Field
            name='lastName'
            component={TextInput}
            placeholder='Second Name'
            value={profile!.lastName}
          />
          <Field
            name='street'
            component={TextAreaInput}
            rows={3}
            placeholder='Street'
            value={profile!.street}
          />
          <Field
            name='city'
            component={TextInput}
            placeholder='City'
            value={profile!.city}
          />
          <Field
            name='county'
            component={TextInput}
            placeholder='County'
            value={profile!.county}
          />
          <Field
            name='profileDescription'
            component={TextInput}
            placeholder='Description'
            value={profile!.profileDescription}
          />
          <Button 
            loading={submitting}
            floated='right'
            disabled={invalid || pristine}
            positive
            content='Update profile'
          />
        </Form>
      )}
    />
  );
};

export default observer(ProfileEditForm);

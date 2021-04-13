import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';

import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';
import { AdvertFormValues } from '../../app/models/advertsFixCar/adverts';
import { combineDateAndTime } from '../../app/Common/util/util';
import TextInput from '../../app/Common/form/TextInput';
import TextAreaInput from '../../app/Common/form/TextAreaInput';
import DateInput from '../../app/Common/form/DateInput';
import { RootStoreContext } from '../../app/stores/rootStore';


const validate = combineValidators({
  title: isRequired({ message: 'title is required' }),
  // carModel: isRequired('Car model'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  date: isRequired('Date'),
  city: isRequired('City'),
  //time: isRequired('Time')
  // advertiserName
  // email
  // phoneNumber
});

interface DetailParams {
  id: string;
}

const AdForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createAd,
    editAd,
    submitting,
    loadAd
  } = rootStore.adStore;

  const [ad, setAd] = useState(new AdvertFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadAd(match.params.id)
        .then(ad => {
          setAd(new AdvertFormValues(ad));
        })
        .finally(() => setLoading(false));
    }
  }, [loadAd, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date,values.time);
    const { date, ...ad } = values;
    ad.date = dateAndTime;
    if (!ad.id) {
      let newAd = {
       ...ad,
        id: uuid()
     };
      createAd(newAd);
    } else {
      editAd(ad);
    }
  };

  return (
    <Grid>
      <Grid.Column >
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={ad}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={ad.title}
                  component={TextInput}
                />
                   {/* <Field
                name='carModel'
                placeholder='CarModel'
                rows={3}
                value={ad.carModel}
                component={TextAreaInput}
                /> */}
                <Field
                  name='description'
                  placeholder='Description'
                  rows={3}
                  value={ad.description}
                  component={TextAreaInput}
                />               
                <Field
                  component={TextInput}
                  name='city'
                  placeholder='City'
                  value={ad.city}
                />
              {/* <Field
                  name='advertiserName'
                  placeholder='AdvertiserName'
                  value={ad.advertiser?.advertUsername}
                  component={TextInput}
                />  */}
                  {/* <Field
                  name='email'
                  placeholder='Email'
                  value={ad.advertiser?.email}
                  component={TextInput}
                />  */}
                  {/* <Field
                  name='phoneNumber'
                  placeholder='PhoneNumber'
                  value={ad.advertiser?.phoneNumber}
                  component={TextInput}
                /> */}
                <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={ad.date}
                  />

                </Form.Group>
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  onClick={
                    ad.id
                      ? () => history.push(`/adverts/${ad.id}`)
                      : () => history.push('/adverts')
                  }
                  disabled={loading}
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(AdForm);

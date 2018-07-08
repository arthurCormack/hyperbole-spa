/*
 *
 * NewsletterWidget
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import { Row, Col, FormGroup } from 'react-bootstrap';
import cx from 'classnames';
import { newsletterSignupAPICall } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { selectNewsletterWidget, selectFormEmail } from './selectors';
// import styles from 'containers/App/styles.css';
import { NEWSLETTER_SUBSCRIPTION_SIGNUP } from 'containers/App/constants';
import { push } from 'react-router-redux';

const defaultBtn = cx('btn', 'btnDefault');


function submit(values, dispatch) {
  // // console.log('typeof values.Personemail=='+ typeof values.Personemail);
   //// console.log('form submitted');
  //  if (values.Personemail == '') {
  if (typeof values.get('Personemail') === 'undefined') {
    throw new SubmissionError({ Personemail: 'Wrong email', _error: 'Subscription failed!' });
  } else {
    dispatch(push('/newsletter'));
    dispatch(newsletterSignupAPICall(values));
    // return new Promise(() => {
    //   dispatch(newsletterSignupAPICall(values));
    //   //// console.log('after dispatch');
    // });
  }
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const defaultHeadingsSidebar = cx('defaultHeading', 'noMargBot');

const SyncValidationForm = (props) => {
  const { error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
      <div className={defaultHeadingsSidebar}>
        <h2>Join the Classical Club</h2>
      </div>
      <Row className="newsLetterContainer">
        <Col md={12}>
          <div className="subscription">
            <form action="/newsletter" className="form" onSubmit={handleSubmit(submit)}>
              <FormGroup className="col-md-12">
                <Field name="Personemail" label="Email Address" type="email" component={renderField} />
              </FormGroup>
              {error && <strong>{error}</strong>}
              <FormGroup className="col-md-6">
                <button type="submit" disabled={submitting}>Subscribe</button>
              </FormGroup>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};


export default reduxForm({
  form: 'newsletterWidget',
})(SyncValidationForm);

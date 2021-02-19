import React from 'react'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import reduxForm from 'redux-form/es/reduxForm'
import { parse } from 'query-string'
import styled from 'styled-components'
import messages from './messages'
import { useIntl, FormattedMessage } from 'react-intl'
import { ROUTE_MAP } from 'security/routes'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useInjectSaga, useFormDispatch } from 'utils/hooks'
import { TextField } from 'components/FormB'
import * as Yup from 'yup';

import { login } from 'security/actions'
import {
  Grid,
  Button,
  FormHelperText
} from '@material-ui/core';


import { NavLink } from 'components/Nav'
//import { HiddenField, PasswordField, TextField } from 'components/Form'
import { ROUTES } from 'security/routes'
import { injectSagas } from 'utils/async'

//import './login.scss'

const FORM_NAME = 'login'

const Container = styled(Grid)`
  padding: 15px 20px;
`

const SubmitButton = styled(Button)`
  width: 100%;
`

const SupportLink = styled(props => <NavLink {...props} />)`
  font-size: 0.75rem;
  line-height: 38px;
`




const Login = ({
  error,
  handleSubmit,
  submitting,
  pristine,
  ...props
}) => {
  useInjectSaga(require('security/sagas/login'))

  const intl = useIntl()
  const submit = useFormDispatch();

  const isDev = process.env.NODE_ENV !== 'production'

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Formik
        initialValues={{
          redirect: parse(props.location.search).next || '/',        
          email: isDev? "user1@user.com": null,
          password: isDev? "password": null,
          _error: "",
        }}
        onSubmit={submit(login)}
      >
        {({isSubmitting, dirty, errors, ...props}) => (
          <Form>
            <Container 
              container
              spacing={3}
            >
                <Grid item xs={12}>
                  
                  <Field
                      name="email"
                      component={TextField}
                      fullWidth={true}
                      color="primary"
                      label={intl.formatMessage(messages.fieldUsername)}
                      autoFocus
                  />
                  <ErrorMessage name="_error">
                    {msg => <FormHelperText error>{msg}</FormHelperText>}
                    
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Field
                        name="password"
                        component={TextField}
                        fullWidth={true}
                        color="primary"
                        label={intl.formatMessage(messages.fieldPassword)}
                    />
                  <div>
                    <SupportLink to={ROUTES.ForgotPassword} routeMap={ROUTE_MAP}>
                      <FormattedMessage {...messages.forgotPassword} />
                    </SupportLink>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <SubmitButton 
                    type="submit"
                    disabled={ isDev? false : !dirty || isSubmitting}
                    variant="contained"
                    color="primary"
                  >
                    {intl.formatMessage(!isSubmitting? messages.submitTitle : messages.submittingTitle)}
                  </SubmitButton>
                </Grid>
            </Container>
          </Form>
        )}
      </Formik>
      
    </>
  )
}
/*
const withForm = reduxForm({ form: FORM_NAME })

const withConnect = connect(
  (state, props) => {
    const isDev = process.env.NODE_ENV !== 'production'
    return ({
      initialValues: {
        redirect: parse(props.location.search).next || '/',        
        email: isDev? "user1@user.com": null,
        password: isDev? "password": null,
      }
    })
  }
)

const withSagas = injectSagas(require('security/sagas/login'))

export default compose(
  withConnect,
  withForm,
  withSagas,
)(Login)
*/
export default Login

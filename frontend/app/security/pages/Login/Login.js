import React from 'react'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import reduxForm from 'redux-form/es/reduxForm'
import { parse } from 'query-string'
import styled from 'styled-components'
import messages from './messages'
import { useIntl, FormattedMessage } from 'react-intl'

import { login } from 'security/actions'
import {
  Grid,
  Button
} from '@material-ui/core';


import { NavLink } from 'components/Nav'
import { HiddenField, PasswordField, TextField } from 'components/Form'
import { ROUTES } from 'routes'
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
  const intl = useIntl()

  const submitTitle = intl.formatMessage(!submitting? messages.submitTitle : messages.submittingTitle)

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={handleSubmit(login)}>
        <Container 
          container
          spacing={3}
        >
            <HiddenField name="redirect" />
            <Grid item xs={12}>
              <TextField name="email"
                        formProps={{
                          fullWidth: true
                        }}
                        label={intl.formatMessage(messages.fieldUsername)}
                        autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              
                <PasswordField name="password"
                              formProps={{
                                fullWidth: true
                              }}
                              label={intl.formatMessage(messages.fieldPassword)}
                />
              <div>
                <SupportLink to={ROUTES.ForgotPassword}>
                  <FormattedMessage {...messages.forgotPassword} />
                </SupportLink>
              </div>
            </Grid>
            <Grid item xs={12}>
              <SubmitButton 
                type="submit"
                disabled={pristine || submitting}
                variant="contained"
                color="primary"
              >
                {submitTitle}
              </SubmitButton>
            </Grid>
        </Container>
          
        </form>
    </>
  )
}

const withForm = reduxForm({ form: FORM_NAME })

const withConnect = connect(
  (state, props) => {
    const isDev = process.env.NODE_ENV !== 'production'
    return ({
      initialValues: {
        redirect: parse(props.location.search).next || '/',
        //email: isDev? "user1@user.com": null,
        //password: isDev? "password": null,
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

import React from 'react'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import reduxForm from 'redux-form/es/reduxForm'
import { parse } from 'query-string'

import { login } from 'security/actions'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { PageContent } from 'components'
import { NavLink } from 'components/Nav'
import { HiddenField, PasswordField, TextField } from 'components/Form'
import { ROUTES } from 'routes'
import { injectSagas } from 'utils/async'

import './login.scss'

const FORM_NAME = 'login'

const Login = (props) => {
  const isDev = process.env.NODE_ENV !== 'production'
  const { error, handleSubmit, submitting, pristine } = props
  return (
    <PageContent>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container className="login-outer" maxWidth={false}>
        <Paper elevation={3}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(login)}>
            <Grid 
              className="login-inner"
              container
              spacing={3}
            >
                <HiddenField name="redirect" />
                <Grid item xs={12}>
                  <TextField name="email"
                            formProps={{
                              fullWidth: true
                            }}
                            label="Email or Username"
                            autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  
                    <PasswordField name="password"
                                  formProps={{
                                    fullWidth: true
                                  }}
                                  label="Password"
                    />
                  <div>
                    <NavLink to={ROUTES.ForgotPassword}
                            className="forgot-password"
                            style={{lineHeight: '38px'}}
                    />
                    </div>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit"
                    disabled={pristine || submitting}
                    variant="contained"
                    color="primary"
                  >
                    {submitting ? 'Logging in...' : 'Submit'}
                  </Button>
                </Grid>
            </Grid>
              
            </form>
        </Paper>   
      </Container>         
    </PageContent>
  )
}

const withForm = reduxForm({ form: FORM_NAME })

const withConnect = connect(
  (state, props) => ({
    initialValues: {
      redirect: parse(props.location.search).next || '/',
    }
  })
)

const withSagas = injectSagas(require('security/sagas/login'))

export default compose(
  withConnect,
  withForm,
  withSagas,
)(Login)

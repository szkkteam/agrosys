import React from 'react'
import { compose } from 'redux'
import reduxForm from 'redux-form/es/reduxForm'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import messages from './messages'
import { useIntl, FormattedMessage } from 'react-intl'

import {
    Grid,
    Button,
    Collapse,
    Typography
} from '@material-ui/core';

import { signUp } from 'security/actions'
import { DangerAlert } from 'components/Alert'
import { EmailField, PasswordField, TextField } from 'components/Form'
import { injectSagas } from 'utils/async'


const FORM_NAME = 'signUp'


const Container = styled(Grid)`
padding: 15px 20px;
`

const SubmitButton = styled(Button)`
  width: 100%;
`

const SignUp = ({
    error,
    handleSubmit,
    pristine,
    submitting,
    ...props
}) => {
    const intl = useIntl()

    const submitTitle = intl.formatMessage(!submitting? messages.submitTitle : messages.submittingTitle)

    return (
        <>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <form onSubmit={handleSubmit(signUp)}>
                {error && <DangerAlert>{error}</DangerAlert>}
                <Container 
                    container
                    spacing={3}
                >
                    <Grid item xs={6}>
                        <TextField name="firstName"
                            autoFocus
                            formProps={{
                                fullWidth: true
                            }}
                            label={intl.formatMessage(messages.fieldFirstName)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="lastName"
                            formProps={{
                                fullWidth: true
                            }}
                            label={intl.formatMessage(messages.fieldLastName)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="username"
                            formProps={{
                                fullWidth: true
                            }}
                            label={intl.formatMessage(messages.fieldUsername)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <EmailField name="email"
                            formProps={{
                                fullWidth: true
                            }}
                            label={intl.formatMessage(messages.fieldEmail)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordField name="password"
                            formProps={{
                                fullWidth: true
                            }}
                            label={intl.formatMessage(messages.fieldPassword)}
                        />
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

const withSagas = injectSagas(require('security/sagas/signUp'))

export default compose(
    withForm,
    withSagas,
)(SignUp)

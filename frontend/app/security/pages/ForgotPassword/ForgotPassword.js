import React from 'react'
import { compose } from 'redux'
import Helmet from 'react-helmet'
import reduxForm from 'redux-form/es/reduxForm'
import formActions from 'redux-form/es/actions'
import styled from 'styled-components'
import messages from './messages'
import { useIntl, FormattedMessage } from 'react-intl'

const { reset } = formActions

import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';

import { forgotPassword } from 'security/actions'
import { DangerAlert } from 'components/Alert'
import { PageContent } from 'components/Content'
import { EmailField } from 'components/Form'
import { injectSagas } from 'utils/async'


const FORM_NAME = 'forgotPassword'


const Container = styled(Grid)`
  padding: 15px 20px;
`

const SubmitButton = styled(Button)`
  width: 100%;
`

const Title = styled(Typography)`
  padding: 15px 10px 0;
`

const ForgotPassword = ({
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
        <title>Forgot Password</title>
      </Helmet>

      {error && <DangerAlert>{error}</DangerAlert>}
      <Title variant="h4">
        <FormattedMessage {...messages.title} />
      </Title>
      <form onSubmit={handleSubmit(forgotPassword)}>
        <Container 
          container
          spacing={3}
        >
          <Grid item xs={12}>
            <EmailField name="email"
              formProps={{
                fullWidth: true
              }}
              label={intl.formatMessage(messages.fieldEmail)}
              autoFocus
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

const withForm = reduxForm({
  form: FORM_NAME,
  onSubmitSuccess: (_, dispatch) => {
    dispatch(reset(FORM_NAME))
  },
})

const withSagas = injectSagas(require('security/sagas/forgotPassword'))

export default compose(
  withForm,
  withSagas,
)(ForgotPassword)

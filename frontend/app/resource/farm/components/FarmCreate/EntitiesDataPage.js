import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import messages from './messages';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form'

import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { SubmitButton, messages as ButtonMessages } from 'components/Button'

import { FARM_CREATE_FORM } from '../../constants'

import './farmcreate.scss'

const EntitiesDataPage = ({
    invalid,
    handleSubmit,
    onCancel,
    submitting,
    pristine,
    action,
    dirty,
    change,
    onBack,
    ...rest 
}) => {

  return (      
    <form onSubmit={handleSubmit} >
        <div className="form-container">
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField name="entitiy"
                            label="Entitiy title"
                            className="from-section"
                            variant="outlined"
                            formProps={{fullWidth: true}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubmitButton
                            disabled={submitting}
                            submitDisabled={pristine || invalid}
                            cancelTitle={ButtonMessages.back}
                            submitTitle={ButtonMessages.submit}
                            onCancel={onBack}
                        />  
                    </Grid>
                </Grid>
        </Grid>     
      </div>
    </form>
  ) 
}


const withForm = reduxForm({
    form: FARM_CREATE_FORM,
    //validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
})

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        return {        
            initialValues: {
                ...locinitialValues
            },
            ...rest
        }
    },
)

export default compose(
    withConnect,
    withForm,
)(EntitiesDataPage) 


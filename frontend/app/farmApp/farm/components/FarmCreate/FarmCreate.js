import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import messages from 'farmApp/farm/messages';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form'

import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { Stepper } from 'components'
import { FARM_CREATE_FORM } from '../../constants'

const steps = [
    messages.farmCreateFormStep1,
    messages.farmCreateFormStep1,
]

const contents = [
    (props) => <div>current step: {props.activeStep}</div>,
    (props) => <div>current step: {props.activeStep}</div>
]

const FarmCreateForm = ({
    invalid,
    handleSubmit,
    onCancel,
    submitting,
    pristine,
    action,
    dirty,
    resetSection,
    change,
    tasks,
    ...rest 
}) => {
  console.log("tasks: ", tasks)
  //console.log("action: ", action)
  //console.log("handleSubmit: ", handleSubmit)

  return (      
    <form onSubmit={handleSubmit} >
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stepper 
                        steps={steps}
                        contents={contents}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="title"
                        label="Title of Template"
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                </Grid>
            </Grid>
      </Grid>     
    </form>
  ) 
}


const withForm = reduxForm({
    form: FARM_CREATE_FORM,
    //validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
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
)(FarmCreateForm) 


import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import reduxForm from 'redux-form/es/reduxForm'
import CssBaseline from '@material-ui/core/CssBaseline';

import { HiddenField, TextField, onlyDecimal } from 'components/Form'
 
import './formseason.scss'


const FORM_NAME = 'formSeason'

/*
const validate = values => {
    const errors = {}
    const requiredFields = [
        'title',
        'geometry',
        'totalArea',
        'eligibleArea',
        //'soilTypeId',
        //'referenceParcelTypeId',
    ]
    requiredFields.forEach(field => {
        if (!values.geometry) {
            errors.title = 'Must draw a shape'
        }
        if (!values[field]) {
            errors[field] = 'Required'
        }

        if (values.eligibleArea && values.totalArea && values.totalArea < values.eligibleArea) {
            errors.totalArea = 'Cannot be bigger than Eliglible Area'
        }
    })
    return errors
}*/

const FormSeason = (props) => {
  const { invalid, handleSubmit, onCancel, submitting, pristine, action, dirty, resetSection, ...rest } = props

  console.log("rest: ", rest)
  //console.log("action: ", action)
  //console.log("handleSubmit: ", handleSubmit)
  return (      
    <form onSubmit={handleSubmit} className="form-parcel">
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField name="title"
                        label="Title of the season"
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                    <HiddenField
                        name="referenceParcels"
                    />
                </Grid>
            </Grid>          
      </Grid>     
    </form>
  ) 
}


const withForm = reduxForm({
    form: FORM_NAME,
    //validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})

//const withSagas = injectSagas(require('field/sagas/createFieldDetail'))

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        console.log("locinitialValues: ", locinitialValues)
        return { 
            initialValues: {
                ...locinitialValues
            },
            ...props

        }
    },
)


export default compose(
    withConnect,
    withForm,
    //withSagas,
)(FormSeason) 


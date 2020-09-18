import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import reduxForm from 'redux-form/es/reduxForm'
import CssBaseline from '@material-ui/core/CssBaseline';

import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { 
    SelectSoil,
    SelectAgriculturalType,
} from 'reference/components'
 
import './formparcel.scss'


const FORM_NAME = 'formParcel'


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
}

const FormParcel = (props) => {
  const { invalid, handleSubmit, onCancel, submitting, pristine, action, dirty, resetSection, ...rest } = props

  //console.log("rest: ", rest)
  //console.log("action: ", action)
  //console.log("handleSubmit: ", handleSubmit)
  return (      
    <form onSubmit={handleSubmit(action)} className="form-parcel">
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
                        label="Title of the field"
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                </Grid>
                <Grid item  xs={12}>
                    <TextField name="notes"
                        label="Notes"
                        multiline={true}
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                    <HiddenField
                        name="geometry"
                        onBlur={(e) => {e.preventDefault() }}
                    />
                    <HiddenField
                        name="referenceParcelType"
                    />
                </Grid>
                <Grid item  xs={6}>
                    <TextField name="totalArea"
                        label="Total area (ha)"
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                        normalize={onlyDecimal}
                        onBlur={(e) => {e.preventDefault() }}
                    />
                </Grid>
                <Grid item  xs={6}>
                    <TextField name="eligibleArea"
                        label="Supported area (ha)"
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                        normalize={onlyDecimal}
                        onBlur={(e) => {e.preventDefault() }}
                    />
                </Grid>
                <Grid item  xs={12}>
                    <SelectSoil
                        name="soilTypeId"
                        label="Select a soil type"
                        formProps={{fullWidth: true}}
                        className="from-section"
                    />
                </Grid>
                <Grid item  xs={12}>
                    <SelectAgriculturalType
                        name="agriculturalTypeId"
                        label="Select a parcel type"
                        formProps={{fullWidth: true}}
                        className="from-section"
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                className="form-button-grp">
                <Grid item xs={6}>
                    <button 
                        className="btn btn-primary form-button"
                        disabled={submitting}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </Grid>
                <Grid item xs={6}>
                    <button type="submit"
                        className="btn btn-primary form-button"
                        disabled={submitting }
                    >
                    {submitting ? 'Saving...' : 'Save'}
                    </button>
                </Grid>
            </Grid>
      </Grid>     
    </form>
  ) 
}


const withForm = reduxForm({
    form: FORM_NAME,
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})

//const withSagas = injectSagas(require('field/sagas/createFieldDetail'))

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        return { 
            initialValues: {
                ...{
                    soilTypeId: 1,
                    agriculturalTypeId: 1,
                }, ...locinitialValues
            },
            ...rest

        }
    },
)


export default compose(
    withConnect,
    withForm,
    //withSagas,
)(FormParcel) 


import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import reduxForm from 'redux-form/es/reduxForm'
import { formValueSelector } from 'redux-form'
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { 
    SelectSoil,
    SelectAgriculturalType,
} from 'reference/components'
import { FORM_PARCEL } from 'parcel/constants'
 
import './formparcel.scss'


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

const FormParcel = ({
    invalid,
    handleSubmit,
    onCancel,
    submitting,
    pristine,
    action,
    dirty,
    change,
    resetSection,
    isAreaLocked,
    ...rest
}) => {
  console.log("isAreaLocked: ", isAreaLocked)
  //console.log("action: ", action)
  //console.log("handleSubmit: ", handleSubmit)

    const lockUnlockArea = () => {
        change('isAreaLocked', !isAreaLocked)
    }

  return (      
    <form onSubmit={handleSubmit(action)} className="form-parcel">
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
        >
            <HiddenField
                name="isAreaLocked"
            />
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
                <Grid item  xs={12}>
                    <IconButton 
                        color="primary"
                        aria-label="lock area"
                        component="span"
                        onClick={lockUnlockArea}
                    >
                        { isAreaLocked?
                            <LockOpenIcon />
                        : 
                            <LockIcon />
                        }
                    </IconButton>
                </Grid>
                <Grid item  xs={6}>
                    <TextField name="totalArea"
                        disabled={isAreaLocked}
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
                        disabled={isAreaLocked}
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
    form: FORM_PARCEL,
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        return { 
            initialValues: {
                ...{
                    isAreaLocked: false,
                    soilTypeId: 1,
                    agriculturalTypeId: 1,
                }, ...locinitialValues
            },
            ...rest

        }
    },
)


const selector = formValueSelector(FORM_PARCEL)
const withSelectIsAreaLocked = connect(
    (state, props) => {
        const isAreaLocked = selector(state, 'isAreaLocked')
        return {
            isAreaLocked
        }
    }
)

export default compose(
    withConnect,
    withForm,
    withSelectIsAreaLocked,
    //withSagas,
)(FormParcel) 


import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import reduxForm from 'redux-form/es/reduxForm'

import { HiddenField, TextField } from 'components/Form'
import { 
    SelectSoil,
    SelectReferenceParcelType,
} from 'reference/components'
 
import './formparcel.scss'


const FORM_NAME = 'formParcel'


const FormParcel = (props) => {
  const { error, handleSubmit, onCancel, submitting, pristine, action, dirty, values, ...rest } = props
  return (      
    <form onSubmit={handleSubmit(action)} className="form-parcel">
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField name="title"
                        label="Title of the field"
                        className="from-section"
                        autoFocus 
                        variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                </Grid>
                <Grid item  xs={12}>
                    <TextField name="notes"
                        label="Notes"
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                    <HiddenField
                        name="geometry"
                        onBlur={(e) => {e.preventDefault() }}
                    />
                    <HiddenField
                        name="totalArea"
                        label="Total area of the field in (ha)"
                        className="from-section"
                        onBlur={(e) => {e.preventDefault() }}
                    />

                    <HiddenField
                        name="eligibleArea"
                        label="Supported area of the field in (ha)"
                        className="from-section"
                        onBlur={(e) => {e.preventDefault() }}
                    />
                </Grid>
                <Grid item  xs={12}>
                    <SelectSoil
                        className="from-section"
                    />
                </Grid>
                <Grid item  xs={12}>
                    <SelectReferenceParcelType
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
                        disabled={submitting}
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
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})

//const withSagas = injectSagas(require('field/sagas/createFieldDetail'))
/*
const withConnect = connect(
    (state, props) => {
        //console.log("featureInEdit: ", props.featureInEdit)

        const {shape = null, area = null} = props.featureInEdit || {}
        const { selectedId } = props
        return { initialValues: {
            shape,
            area,
            selectedId,
        }}
    },
)
*/

export default compose(
    //withConnect,
    withForm,
    //withSagas,
)(FormParcel) 


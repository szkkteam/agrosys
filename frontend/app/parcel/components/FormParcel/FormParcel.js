import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
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
    <form onSubmit={handleSubmit(action)} className="form-fielddetail">

        <TextField name="title"
                    label="Title of the field"
                    className="form-detailsection-row"
                    autoFocus 
        />

        <TextField name="notes"
                    label="Notes"
                    className="form-detailsection-row"
        />

        <HiddenField
            name="geometry"
            onBlur={(e) => {e.preventDefault() }}
        />

        <HiddenField
            name="totalArea"
            label="Total area of the field in (ha)"
            className="form-detailsection-row"
            onBlur={(e) => {e.preventDefault() }}
        />

        <HiddenField
            name="eligibleArea"
            label="Supported area of the field in (ha)"
            className="form-detailsection-row"
            onBlur={(e) => {e.preventDefault() }}
        />

        <SelectSoil
            className="form-detailsection-row"
            {...rest}
        />
 
        <SelectReferenceParcelType
            className="form-detailsection-row"
            {...rest}
        />


        <div className="row">
            <button 
                    style={{float: "left"}}
                    className="btn btn-primary form-cancel"
                    disabled={submitting}
                    onClick={onCancel}
            >
                Cancel
            </button>
            <button type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
            >
            {submitting ? 'Saving...' : 'Save'}
            </button>

        </div>
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


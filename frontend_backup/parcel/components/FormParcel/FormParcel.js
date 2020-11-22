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

import { convertHaToM2, convertM2ToHa } from 'utils/converter'
import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { 
    SelectSoil,
    SelectAgriculturalType,
} from 'reference/components'
import { FORM_PARCEL, parcelTypesEnum } from 'parcel/constants'
 
import { default as SectionAgriculturalParcel } from './SectionAgriculturalParcel'
import { validate as AgriculturalParcelValidate } from './SectionAgriculturalParcel'
import { default as SectionPhysicalBlock } from './SectionPhysicalBlock'
import { validate as PhysicalBlockValidate } from './SectionPhysicalBlock'

import './formparcel.scss'

 const validate = values => {
    switch(values.referenceParcelType) {
        case parcelTypesEnum.AGRICULTURAL_PARCEL:
            return AgriculturalParcelValidate(values)
        case parcelTypesEnum.PHYSICAL_BLOCK:
            return PhysicalBlockValidate(values)
        default:
            return {}
    }
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
    referenceParcelType,
    ...rest
}) => {
  console.log("isAreaLocked: ", isAreaLocked)
  //console.log("action: ", action)
  //console.log("handleSubmit: ", handleSubmit)

    const lockUnlockArea = () => {
        change('isAreaLocked', !isAreaLocked)
    }


        
    const renderParcelTypeFields = (referenceParcelType) => {
        switch (referenceParcelType) {
            case parcelTypesEnum.AGRICULTURAL_PARCEL:
                return SectionAgriculturalParcel
            case parcelTypesEnum.PHYSICAL_BLOCK:
                //return SectionAgriculturalParcel
                return SectionPhysicalBlock
            case parcelTypesEnum.UNKOWN:
            default:
                return Div
        }
    }

    const ParcelTypeComponent = renderParcelTypeFields(referenceParcelType)


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
            <HiddenField
                name="referenceParcelType"
            />
            <ParcelTypeComponent
                onLockUnlock={lockUnlockArea}
                isAreaLocked={isAreaLocked}
            />
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
        let extraValues = {}
        if (locinitialValues.referenceParcelType != parcelTypesEnum.AGRICULTURAL_PARCEL) {
            Object.assign(extraValues, {
                soilTypeId: 1,
                agriculturalTypeId: 1,
            })
        }
        return { 
            initialValues: {
                isAreaLocked: false,
                ...extraValues,
                ...locinitialValues,
            },
            ...rest

        }
    },
)


const selector = formValueSelector(FORM_PARCEL)
const withSelectIsAreaLocked = connect(
    (state, props) => {
        const isAreaLocked = selector(state, 'isAreaLocked')
        const referenceParcelType = selector(state, 'referenceParcelType')
        return {
            isAreaLocked,
            referenceParcelType
        }
    }
)

export default compose(
    withConnect,
    withForm,
    withSelectIsAreaLocked,
    //withSagas,
)(FormParcel) 


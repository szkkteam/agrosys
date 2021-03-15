import React from 'react'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import { HiddenField, TextField, onlyDecimal } from 'components/Form'

import { 
    SelectSoil,
    SelectAgriculturalType,
} from 'reference/components'

export const validate = values => {
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

export default ({
    onLockUnlock,
    isAreaLocked,
}) => {

    return (
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
                        onClick={onLockUnlock}
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
                        //defaultValue=""
                        //parse={normalizeArea}
                        //format={areaFormatter('ha')}
                        //format={formatAmount}
                        //onBlur={(e) => {e.preventDefault() }}
                    />
                </Grid>
                <Grid item  xs={6}>
                    <TextField name="eligibleArea"
                        disabled={isAreaLocked}
                        label="Supported area (ha)"
                        className="from-section"
                        variant="outlined"
                        formProps={{fullWidth: true}}
                        //normalize={onlyDecimal}
                        //format={areaFormatter('ha')}
                        //onBlur={(e) => {e.preventDefault() }}
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
    )
}
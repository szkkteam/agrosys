import React from 'react'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import { HiddenField, TextField, onlyDecimal } from 'components/Form'

export const validate = values => {
    const errors = {}
    const requiredFields = [
        'title',
        'geometry',
        'totalArea',
    ]
    requiredFields.forEach(field => {
        if (!values.geometry) {
            errors.title = 'Must draw a shape'
        }
        if (!values[field]) {
            errors[field] = 'Required'
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
                </Grid>
                <Grid item  xs={6}>
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
            </Grid>
    )
}
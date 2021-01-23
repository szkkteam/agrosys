import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import messages from './messages';

import {
    Grid,
    FormControl,
    FormLabel
} from '@material-ui/core';

import { 
    HiddenField,
    TextField,
} from 'components/Form'

const BorderSection = styled(FormControl)`
    padding: 25px;
    border: 1px solid gray;
    border-radius: 4px;
    border-color: rgba(0, 0, 0, 0.23);
`

const GeneralFields = ({
    className,
    name,
    ...rest 
}) => {

    const intl = useIntl()

    return (      
        <BorderSection component="fieldset" className={className}>
            <FormLabel component="legend">General Fields</FormLabel>
            <Grid
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <TextField name={`${name}.title`}
                        label="Parcel title"
                        //variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField name={`${name}.ownership`}
                        label="Ownership"
                        //variant="outlined"
                        formProps={{fullWidth: true}}
                    />
                </Grid>            
            </Grid>   
        </BorderSection>
    ) 
}

GeneralFields.propTypes = {

}

export default GeneralFields
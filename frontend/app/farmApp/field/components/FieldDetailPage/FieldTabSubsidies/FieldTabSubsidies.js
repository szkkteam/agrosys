import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import messages from './messages';

import {
    Grid
} from '@material-ui/core';

import { 
    HiddenField,
    BooleanField,
    TextField
} from 'components/Form'


const FieldTabSubsidies = ({
    ...rest 
}) => {

    const intl = useIntl()

    return (      
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12}>
                <TextField name="subsidies"
                    label="Subsidies"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="akgCode"
                    label="AKG Code"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="ketNumber"
                    label="KET number"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>            
        </Grid>   
    ) 
}

FieldTabSubsidies.propTypes = {

}

export default FieldTabSubsidies
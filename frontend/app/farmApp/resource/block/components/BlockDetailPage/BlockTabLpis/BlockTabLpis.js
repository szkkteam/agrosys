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


const BlockTabLpis = ({
    ...rest 
}) => {

    const intl = useIntl()

    return (      
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12}>
                <TextField name="cadastralPlot"
                    label="Cadastral Plot"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="lpisNumber"
                    label="Mepar Number"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="validFrom"
                    label="Valid From"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="validTo"
                    label="Valid To"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <BooleanField name="natura2000"
                    label="Natura 2000"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <BooleanField name="nitrateSensitive"
                    label="Nitrate Sensitive"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <BooleanField name="slope"
                    label="12% Slope"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
        </Grid>   
    ) 
}

BlockTabLpis.propTypes = {

}

export default BlockTabLpis
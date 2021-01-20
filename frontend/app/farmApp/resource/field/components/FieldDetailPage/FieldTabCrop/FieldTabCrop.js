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


const FieldTabCrop = ({
    ...rest 
}) => {

    const intl = useIntl()

    return (      
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12}>
                <TextField name="cropCode"
                    label="Crop code"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="variant"
                    label="Crop variant"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField name="yield"
                    label="Planned yield"
                    variant="outlined"
                    formProps={{fullWidth: true}}
                />
            </Grid>                              
        </Grid>   
    ) 
}
/**
 * Ezt production(Season)-ra értelmezzük
 <Grid item xs={12}>
    <TextField name="cultivationType"
        label="Cultivation Type"
        variant="outlined"
        formProps={{fullWidth: true}}
    />
</Grid>  
* Cultivation types (művelési rendszer)
 * Bakhatás művelés
 * Csökkentett művelés (15-30% maradvány)
 * Min till (Minimális talajművelés max 5.cm-es mélységig)
 * Mulcsos művelés
 * No till (művelés nélküli direktvetés)
 * Szántás
 * Talajvédő művelés (min 5 cm-es mélységtől)
 * Egyéb művelés
 */

FieldTabCrop.propTypes = {

}

export default FieldTabCrop
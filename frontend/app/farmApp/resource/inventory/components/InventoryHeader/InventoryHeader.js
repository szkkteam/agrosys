import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { 
    Grid,
    Typography
}  from '@material-ui/core';

const PageTitle = styled(Typography)`
    margin-top: 15px;
`


const InventoryHeader = ({

}) => {
    return (
        <Grid 
            container
            alignItems="stretch"
            spacing={1}
        >
            <Grid item xs={12}>
                <PageTitle variant="h5">
                    <FormattedMessage {...messages.title} />
                </PageTitle>
            </Grid>            
        </Grid>       
    )
}

InventoryHeader.propTypes = {

}

export default InventoryHeader


            
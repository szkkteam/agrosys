import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    Typography,
    Button,
    Grid
} from '@material-ui/core';

import { LeafletMap } from 'farmApp/map/components'

const MapSnapshot = styled(LeafletMap)`
    width: 100%;
    height: 300px;
`

const DescriptionContainer = styled.div`
    margin: 0px 25px;
    h6 {
        margin-bottom: 15px;
    }
    button {
        margin-top: 25px;
    }
`

const FieldDetailMapSnapshot = ({
    onBorderEditClick,

}) => {
    return (
        <Grid container item xs={12}>
            <Grid item xs={7}>
                <MapSnapshot
                />
            </Grid>
            <Grid item xs={5} style={{marginTop: "20px"}}>
                <DescriptionContainer>
                    <Typography variant="h6">
                        <FormattedMessage {...messages.borderEditTitle}/>
                    </Typography>
                    <Typography variant="body2">
                        <FormattedMessage {...messages.borderEditDesc}/>
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onBorderEditClick}
                    >
                        <FormattedMessage {...messages.borderEditButtonTitle}/>
                    </Button>
                </DescriptionContainer>
            </Grid>
        </Grid>
    )
}


FieldDetailMapSnapshot.propTypes = {

}

export default FieldDetailMapSnapshot
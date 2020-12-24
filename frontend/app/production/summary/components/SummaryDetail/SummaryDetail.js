import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'


import {
    Grid,
    Toolbar,
    Typography,
    IconButton,
    ButtonGroup,
    Button,
    Link
} from '@material-ui/core';

const Container = styled(Grid)`
    padding: 10px 20px;
`

const SummaryDetail = ({

}) => {
    return (
        <Container
            container
        >
            <Grid item xs={12}>
                <Typography variant="h6">
                    Parcel 1
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Suggestions
                </Typography>
            </Grid>
            <Grid item xs={12}>

            </Grid>
        </Container>
    )
}

SummaryDetail.propTypes = {

}

export default SummaryDetail
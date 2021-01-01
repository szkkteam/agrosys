import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
    Grid,
    Toolbar,
    Typography,
    IconButton,
    ButtonGroup,
    Button,
    Link
} from '@material-ui/core';

import {
    SummaryProductionSelector
} from '..'

import { 
    SearchButton,
} from 'components'

const StyledToolbar = styled(forwardRef((props, ref) => <Toolbar ref={ref} {...props} />))`
    background-color: #fff;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    > p:nth-child(1) {
        font-size: 1rem;
        font-weight: bold;
    }
`


const AddButton = styled(Button)`
    padding: 4px 4px;
    min-width: 20px;
`

const StyledButtonGroup = styled(ButtonGroup)`
    width: 100%;
`

const GridContainer = styled(Grid)`
    border: 1px solid rgba(35, 149, 83, 0.5);
    padding: 5px 20px;
`

const StatButton = ({
    children,
    ...props
}) => {
    return (
        <StyledButtonGroup 
            variant="outlined"
            color="primary"
            aria-label="split button"
            {...props}
        >
            {children}
            <AddButton
                color="primary"
                size="small"
                aria-label="select merge strategy"
                aria-haspopup="menu"
                //onClick={handleToggle}
            >
                <ArrowDropDownIcon />
            </AddButton>
        </StyledButtonGroup>
    )
}

const FieldSummaryStats = ({

}) => {
    return (
        <StatButton>
            <GridContainer
                container
                justify="flex-start"
                alignItems="center"
            >
                <Grid item xs={3}>
                    <Column>
                        <Typography variant="body2">35.5</Typography>
                        <Typography variant="body2">hectare</Typography>
                    </Column>
                </Grid>
                <Grid item xs={3}>
                    <Column>
                        <Typography variant="body2">BBCH11</Typography>
                        <Typography variant="body2">Growth stage</Typography>
                    </Column>
                </Grid>
                <Grid item xs={3}>
                    <Column>
                        <Typography variant="body2">3 days till</Typography>
                        <Typography variant="body2">Harvesting</Typography>
                    </Column>
                </Grid>
                <Grid item xs={3}>
                    <Column>
                        <Typography variant="body2">Abony, </Typography>
                        <Typography variant="body2">Variants</Typography>
                    </Column>
                </Grid>
            </GridContainer>
        </StatButton>
    )
}

FieldSummaryStats.propTypes = {

}

export default FieldSummaryStats
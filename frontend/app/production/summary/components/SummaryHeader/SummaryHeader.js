import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneIcon from '@material-ui/icons/Done';

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
} from '../../components'

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

const StyledLink = styled(Link)`
    text-align: left;
`

const AddButton = styled(Button)`
    padding: 4px 4px;
    min-width: 20px;
`

const StatButton = ({
    icon: Icon = AddCircleIcon,
    children,
    ...props
}) => {
    return (
        <ButtonGroup 
            variant="outlined"
            color="primary"
            aria-label="split button"
            {...props}
        >
            <Button 
                disabled
                style={{
                    flexGrow: 1, textAlign: "left",
                    color: "black"
                }}
            >
                <Column>
                    {children}
                </Column>
            </Button>
            <AddButton
                color="primary"
                size="small"
                aria-label="select merge strategy"
                aria-haspopup="menu"
                //onClick={handleToggle}
            >
                <Icon />
            </AddButton>
        </ButtonGroup>
    )
}


const ColumnButton = styled.div`
    display: flex;
    flex-direction: column;
    > 
`

const ProductionStats = ({

}) => {
    return (
        <Grid
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
        </Grid>
    )
}

const SummaryHeader = forwardRef(({
    title,
    ...props
}, ref) => {
    const intl = useIntl()


    return (
        <StyledToolbar
            ref={ref}
        >
            <Grid
                container
                alignItems="center"
                justify="flex-start"
                spacing={0}
            >
                <Grid item xs={3}>
                    <SummaryProductionSelector />
                </Grid>
                <Grid item xs={6}>
                    <ProductionStats />
                </Grid>
                <Grid item xs={3}>
                    right side
                </Grid>          
            </Grid>
        </StyledToolbar>
    )
})

SummaryHeader.propTypes = {

}

export default SummaryHeader
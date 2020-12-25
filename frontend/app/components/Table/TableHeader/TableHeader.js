import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    Grid,
    Toolbar,
    Typography,
    Chip,
    Button
} from '@material-ui/core';

import { 
    SearchButton,
} from 'components'

import ToolbarTitle from '../ToolbarTitle'
import TablePrimaryActionButton from '../TablePrimaryActionButton'

const StyledToolbar = styled(forwardRef((props, ref) => <Toolbar ref={ref} {...props} />))`
    background-color: #fff;
`

const FlexGrid = styled(Grid)`
    display: flex;
`

const Views = styled.div`
    margin-left: auto;
`

const TableHeader = forwardRef(({
    title,
    children,
    //columns,
    //onColumnChanged,
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
                spacing={0}
            >
                <Grid item xs={3}>
                    <ToolbarTitle title={title} />
                </Grid>
                <Grid item xs={9}>
                    {children}
                </Grid>                            
            </Grid>
        </StyledToolbar>
    )
})
/*
<StyledToolbar
    ref={ref}
>
    <Grid
        container
        alignItems="center"
        spacing={0}
    >
        <Grid item xs={8}>
            <ToolbarTitle title={title} />
        </Grid>
        <FlexGrid item xs={4}>
            { !options.disableActions
                ? <TablePrimaryActionButton
                    title={messages.add}
                />
                : null }                    
            <Views>
                {views}
            </Views>
        </FlexGrid>                
    </Grid>
</StyledToolbar>
*/

TableHeader.propTypes = {
    title: PropTypes.object.isRequired,
    options: PropTypes.shape({
        disableActions: PropTypes.bool,
    })
}

export default TableHeader
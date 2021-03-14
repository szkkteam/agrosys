import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import EuroIcon from '@material-ui/icons/Euro';
import MapIcon from '@material-ui/icons/Map';

import {
    Button,
    Typography,
    IconButton,
    Grid
} from '@material-ui/core'

const Spacer = styled.div`
    flex-grow: 1;
`

const Flex = styled.div`
    display: flex;
`

const Subheader = styled(Typography)`
    ${({theme}) => `
        color: ${theme.palette.text.secondary};
    `}
`

const StatisticItem = ({
    title,
    value
}) => {
    return (
        <div style={{flex: 1}}>          
            <Typography variant="h6">
                {value}
            </Typography>                
            <Subheader variant="caption">
                {title}
            </Subheader>    
        </div>
    )
}

const PlanCropPanelSummary = ({
    expanded,
    ...props
}) => {
    const theme = useTheme();
    const isTable = useMediaQuery(theme.breakpoints.up('sm'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));


    return (
        <>            
            <div style={{minWidth: "260px"}}>
                <Typography variant="h6">
                    Őszi búza
                </Typography>
                <Subheader variant="caption">
                    (2019 Szeptember 9 - 2020 Január 10)
                </Subheader>
            </div>          
            <StatisticItem
                title="Total area"
                value="37.5 ha"
            />
            { isTable && <StatisticItem
                title="Predicted yield"
                value="12t"
            /> }
            { isDesktop && <StatisticItem
                title="Predicted income"
                value="32.00$"
            /> }
            { isDesktop && <StatisticItem
                title="Predicted expenses"
                value="12.00$"
            /> }
                        
        </>
    )
}
/*
{expanded && <Button
                variant="contained"
                color="primary"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
            >
                Change task
            </Button>}
*/

PlanCropPanelSummary.propTypes = {

}

export default PlanCropPanelSummary
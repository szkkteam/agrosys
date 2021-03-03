import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { format } from 'date-fns';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDateFnsLocale } from 'utils/hooks'

import {
    Button,
    Typography,
    IconButton,
    Grid
} from '@material-ui/core'


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

const CropPanelSummary = ({
    title,
    date,
    expanded,
    ...props
}) => {
    const { locale }  = useDateFnsLocale()
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('sm'));

    const { start, end } = date
    return (
        <>            
            <div style={{minWidth: "260px"}}>
                <Typography variant="h6">
                    Őszi búza
                </Typography>
                <Subheader variant="caption">
                    {`(${format(start, 'yyyy, MMMM', {locale})} - ${format(end, 'yyyy, MMMM', {locale})})`}
                </Subheader>
            </div>          
            <StatisticItem
                title="Total area"
                value="37.5 ha"
            />
            { isTablet && <StatisticItem
                title="Predicted yield"
                value="12t"
            /> }                                    
        </>
    )
}


CropPanelSummary.propTypes = {

}

export default CropPanelSummary
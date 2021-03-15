import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { format } from 'date-fns';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDateFnsLocale, useConvertArea, useConvertYield } from 'utils/hooks'


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

const CropProductionCropSummary = ({
    title,
    dates,
    measures,
    expanded,
    ...props
}) => {
    const intl = useIntl()
    const theme = useTheme();
    const isTable = useMediaQuery(theme.breakpoints.up('sm'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const { yield: yieldKg, area: areaM2, icome, expenses } = measures
    const { locale }  = useDateFnsLocale()

    const area = useConvertArea(areaM2)
    const _yield = useConvertYield(yieldKg)

    return (
        <>            
            <div style={{minWidth: "260px"}}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Subheader variant="caption">
                    {`(${format(dates.start, 'yyyy, MMMM', {locale})} - ${format(dates.end, 'yyyy, MMMM', {locale})})`}
                </Subheader>
            </div>          
            <StatisticItem
                title={intl.formatMessage(messages.area)}
                value={area}
            />
            { isTable && <StatisticItem
                title={intl.formatMessage(messages.yield)}
                value={_yield}
            /> }
            { isDesktop && <StatisticItem
                title={intl.formatMessage(messages.income)}
                value="32.00$"
            /> }
            { isDesktop && <StatisticItem
                title={intl.formatMessage(messages.expenses)}
                value="12.00$"
            /> }
                        
        </>
    )
}


CropProductionCropSummary.propTypes = {
    title: PropTypes.string,
    dates: PropTypes.shape({
        start: PropTypes.any,
        end: PropTypes.any
    }),
    measures: PropTypes.shape({
        yield: PropTypes.number,
        area: PropTypes.number,
        income: PropTypes.number,
        expenses: PropTypes.number
    })
}

export default CropProductionCropSummary
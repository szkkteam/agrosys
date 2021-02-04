import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { format } from 'date-fns';

import { useDateFnsLocale } from 'utils/hooks'
import { useSeasonCreateDialog } from '../../hooks'

import {
    Grid,
    Paper,
    Typography,
    IconButton,
} from '@material-ui/core'

import CachedIcon from '@material-ui/icons/Cached';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineDot,
    TimelineContent,
    TimelineOppositeContent
} from '@material-ui/lab';

import { SEASON_STATUS } from '../../constants'

const TimelineDotButton = styled(IconButton)`
    padding: 8px;
`

const TimelineDotSpacer = styled.span`
    padding: 8px;
`

const DateContent = styled(TimelineOppositeContent)`
    padding-left: 0px;
`

const SeasonContent = styled(TimelineContent)`
    padding-right: 0px;
`

export const SeasonItem = ({
    startDate,
    title,
    isLast=false,
    status,
    ...props
}) => {
    const { locale }  = useDateFnsLocale()

    const getStatusIcon = () => {

        switch(status) {
            case SEASON_STATUS.PLANNED:
                return <NotInterestedIcon />
            case SEASON_STATUS.IN_PROGRESS:
                return <CachedIcon color="secondary" />
            case SEASON_STATUS.FINISHED:
                return <CheckCircleOutlineIcon color="primary" />
            default:
                return <CheckCircleOutlineIcon color="primary" />
        }
    }

    return (
        <TimelineItem>
            <DateContent>
                <Typography>
                    {format(startDate, 'yyyy, MMMM', {locale})}
                </Typography>
            </DateContent>
            <TimelineSeparator>
                <TimelineDotSpacer>
                    {getStatusIcon()}
                </TimelineDotSpacer>
                {!isLast && <TimelineConnector />}
            </TimelineSeparator>
            <SeasonContent>
                <Typography>
                    {title}
                </Typography>
            </SeasonContent>
        </TimelineItem>
    )
}

export const AddSeasonItem = ({
    isLast=false,
    ...props
}) => {
    const create = useSeasonCreateDialog()

    const handleCreate = () => {
        create()
    }

    return (
        <TimelineItem>
            <DateContent/>
            <TimelineSeparator>
                <TimelineDotButton
                    onClick={handleCreate}
                >
                    <AddCircleOutlineIcon color="primary"/>
                </TimelineDotButton>
                {!isLast && <TimelineConnector />}
            </TimelineSeparator>
            <SeasonContent>
                <Typography>
                    Add season
                </Typography>
            </SeasonContent>
        </TimelineItem>
    )
}

SeasonItem.propTypes = {

}

AddSeasonItem.propTypes = {

}

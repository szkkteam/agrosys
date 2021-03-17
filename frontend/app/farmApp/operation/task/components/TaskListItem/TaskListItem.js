import React, { useRef, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { differenceInCalendarDays } from 'date-fns'
import { withLinkComponent } from 'utils/hoc'

import MasterListItem from 'components/List/MasterListItem'
import { CropTag } from 'farmApp/product/crop/components'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {
    CircularProgress,
    Box,
    Typography,

    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core'


// FIXME: This should be on hover, but not working
const ActionIcon = styled(ArrowForwardIosIcon)`
    display: inline-block;
`


const HoverListItem = styled(MasterListItem)`
    &:hover ${ActionIcon} {
        display: inline-block;
    }
`

const ProgressOutline = styled(CircularProgress)`
    ${({theme}) => `
        position: absolute;
        color: ${theme.palette.grey[500]};
    `}
`

const Flex = styled.span`
    display: flex;
`

const Spacer = styled.span`
    flex-grow: 1;
`

const IconLink = withLinkComponent(IconButton)

const Progress = ({
    value,
    ...props
}) => {

    return (
        <Box position="relative" display="inline-flex">
            <ProgressOutline variant="determinate"  value={100} {...props} />
            <CircularProgress variant="determinate"  value={value} {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    )
}

const TaskListItem = ({
    data: inputData = {},
    ...props
}) => {
    const intl = useIntl()
    const data = {
        cropType: {
            title: "Őszi búza",
            short: "őb",            
        },
        title: "Őszi búza aratás",
        totalArea: 120,
        completedArea: 35.2,
        dates: {
            start: new Date()
        },
        ...inputData
    }   

    const startDueDate = differenceInCalendarDays(data.dates.start, new Date())

    // FIXME: Get real operation ID
    const operationId = 1

    return (
         <HoverListItem
            button
            divider
         >
             <ListItemAvatar>
                 <Progress 
                    value={data.completedArea / data.totalArea * 100 } 
                 />
             </ListItemAvatar>
             <ListItemText
                primary={
                    <Flex>
                        <Typography variant="body1">
                            {data.title}
                        </Typography>
                        <Spacer />
                        <CropTag
                            {...data.cropType}
                        />
                    </Flex>
                }

                secondary={
                    <Flex>
                        <Typography variant="caption">
                            {`${data.completedArea}/${data.totalArea} ha`}
                        </Typography>
                        <Spacer />
                        <Typography variant="caption">
                            {intl.formatRelativeTime(startDueDate, 'days')}
                        </Typography>
                    </Flex>
                    
                }                
             />
             <ListItemSecondaryAction>
                 <IconLink 
                    edge="end"
                    to={ROUTES.OperationTaskDetail}
                    params={{id: operationId}}
                >
                    <ActionIcon /> 
                 </IconLink>
             </ListItemSecondaryAction>
         </HoverListItem>
    )
}

TaskListItem.propTypes = {

}

export default TaskListItem
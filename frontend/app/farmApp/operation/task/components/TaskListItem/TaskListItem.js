import React, { useRef, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
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
    /*
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= value ? value : prevProgress + 1))
        }, 20)
        return () => {
            clearInterval(timer)
        }
    }, [])
    */
    //<ProgressOutline variant="determinate" value={100} />
    return (
        <Box position="relative" display="inline-flex">
            
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

}) => {
    

    const cropType = {
        title: "Őszi búza",
        short: "őb"
    }
    // FIXME: Get real operation ID
    const operationId = 1

    return (
         <HoverListItem
            button
            divider
         >
             <ListItemAvatar>
                 <Progress 
                    value={30} 
                 />
             </ListItemAvatar>
             <ListItemText
                primary={
                    <Flex>
                        <Typography variant="body1">
                            Havesting whatever
                        </Typography>
                        <Spacer />
                        <CropTag
                            {...cropType}
                        />
                    </Flex>
                }

                secondary={
                    <Flex>
                        <Typography variant="caption">
                            12/120 ha
                        </Typography>
                        <Spacer />
                        <Typography variant="caption">
                            in 3 days
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
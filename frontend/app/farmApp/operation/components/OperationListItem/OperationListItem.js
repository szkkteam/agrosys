import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

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
    ListItemIcon
} from '@material-ui/core'



const HoverListItem = styled(MasterListItem)`

`

const ActionIcon = styled(ArrowForwardIosIcon)`
    display: none;
    ${HoverListItem}:hover & {
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

const Progress = ({
    ...props
}) => {
    return (
        <Box position="relative" display="inline-flex">
            <ProgressOutline variant="determinate" value={100} />
            <CircularProgress variant="determinate" {...props} />
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
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    )
}

const OperationListItem = ({

}) => {
    

    const cropType = {
        title: "Őszi búza",
        short: "őb"
    }

    return (
         <HoverListItem
            button
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
                <ActionIcon /> 
             </ListItemSecondaryAction>
         </HoverListItem>
    )
}

OperationListItem.propTypes = {

}

export default OperationListItem
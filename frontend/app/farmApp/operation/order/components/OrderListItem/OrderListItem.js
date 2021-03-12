import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
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

    Avatar,
    Chip,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core'

const ListContainer = styled(MasterListItem)`
    align-items: flex-start;
`

const AvatarContainer = styled(ListItemAvatar)`
    margin-top: 6px;
`

const Flex = styled.span`
    display: flex;
`

const Spacer = styled.span`
    flex-grow: 1;
`

const OrderListItem = ({

}) => {
    const cropType = {
        title: "Őszi búza",
        short: "őb"
    }

    return (
        <ListContainer
            button
            divider
        >
            <AvatarContainer>
                <Avatar>JD</Avatar>
            </AvatarContainer>
            <ListItemText
                disableTypography
                primary={
                    <Flex>
                        <Typography variant="body1">
                            Havesting - Őszi búza 2020
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
                            Field 1, 12 ha
                        </Typography>
                        <Spacer />
                                              
                    </Flex>
                    
                }                
            />
            
        </ListContainer>
    )
}
/*
TODO: Display the required equipment for the given task?
<ul style={{listStyle: "none"}}>
    <li>
        <Chip
            label="tractor"
            size="small"
        />
    </li>

</ul>  
*/

OrderListItem.propTypes = {

}

export default OrderListItem
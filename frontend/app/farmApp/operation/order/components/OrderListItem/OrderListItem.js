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
    id,
    data: initData = {},
    ...props
}) => {

    const data = {
        cropType: {
            title: "Őszi búza",
            short: "őb"
        },
        title: "Aratás",
        fieldTitle: 'Tábla 1',
        area: 12,
        user: 'KB',
        ...initData
    }

    console.debug("Props: ", props)
    

    return (
        <ListContainer
            button
            divider
            data={id}
            {...props}
        >
            <AvatarContainer>
                <Avatar>
                    {data.user}
                </Avatar>
            </AvatarContainer>
            <ListItemText
                disableTypography
                primary={
                    <Flex>
                        <Typography variant="body1">
                            {`${data.title} - ${data.cropType.title}`}
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
                            {`${data.fieldTitle}, ${data.area} ha`}
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
import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { useIntl, FormattedMessage } from 'react-intl'
import { useConvertArea } from 'utils/hooks'

import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ItemMenu } from 'components'
import MasterListItem from 'components/List/MasterListItem'

import {
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemIcon,
    Typography,
    Avatar,
    IconButton
} from '@material-ui/core';

import FieldListItemBoundary from '../FieldListItemBoundary/FieldListItemBoundary'

import { useSelectField } from '../../hooks'

const ListContainer = styled(MasterListItem)`
    height: 70px;
    width: 100%;
    padding: 10px 0px;
`

const FieldListItem = ({    
    id,
    //payload,
    children,
    className,
    disableAction=false,
    disableButton=false,
    ...props
}) => {
    const [showAction, setShowAction] = useState(true)

    const handleShowAction = () => {
        setShowAction(true)
    }

    const handleHideAction = () => {
        setShowAction(false)
    }

    //console.debug("FieldListItem - data: ", data)
    const items = [
        {title: messages.edit, link: { to: ROUTES.ResourceFieldEdit, params: {id: 1}}},
        //{title: messages.edit, onClink: null},
        {title: messages.delete, onClink: null}
    ]

    const { payload, isLoading } = useSelectField(id)

    const { 
        title,
        geometry,
        area: areaM2,
        lpis,
    } = payload || {}

    const { meparId } = lpis || {}

    const area = useConvertArea(areaM2)

    const listProps = disableButton? { ContainerComponent: 'div' } : {button: true, divider: true}

    return (
        <ListContainer
            data={id}
            {...listProps}
            className={className}
            // FIXME: There is a bug somewhere. If leave is defined as soon the user hover over the action button, its triggered and hide it
            //onMouseEnter={handleShowAction}
            //onMouseLeave={handleHideAction}
            {...props}
        >
            {children}
            <FieldListItemBoundary 
                geometry={geometry}
            />
            <ListItemText 
                primaryTypographyProps={{
                    noWrap: true,
                }}
                secondaryTypographyProps={{
                    noWrap: true,
                }}
                primary={`${title}, ${area}`}
                secondary={`(${meparId})`}
            />
            
            <ListItemSecondaryAction>
                { !disableAction && showAction && 
                <ItemMenu icon={MoreVertIcon} items={items} /> }
            </ListItemSecondaryAction>
        </ListContainer>
    )
}

FieldListItem.propTypes = {
    disableButton: PropTypes.bool,
    disableAction: PropTypes.bool,
}

export default FieldListItem
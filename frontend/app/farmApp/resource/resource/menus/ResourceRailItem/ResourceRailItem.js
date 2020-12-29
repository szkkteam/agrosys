import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import InboxIcon from '@material-ui/icons/MoveToInbox';
import { NavRailItem } from 'components/NavRail'
 
const ResourceRailItem = ({
    ...rest
}) => {
   
    return (
        <NavRailItem
            title={messages.title}
            to={ROUTES.Resource}
            IconComponent={InboxIcon}
            {...rest}
        />       
    )
}

ResourceRailItem.propTypes = {

}

export default ResourceRailItem
import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'farmApp/routes'

import ListIcon from '@material-ui/icons/List';
import { NavRailItem } from 'components/NavRail'
 
const ResourceRailItem = ({
    ...rest
}) => {
   
    return (
        <NavRailItem
            title={messages.title}
            to={ROUTES.InventoryList}
            IconComponent={ListIcon}
            {...rest}
        />       
    )
}

ResourceRailItem.propTypes = {

}

export default ResourceRailItem
import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import ListIcon from '@material-ui/icons/List';
import { MenuItem } from 'components'
 
const InventoryMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            to={ROUTES.InventoryList}
            IconComponent={ListIcon}
            {...rest}
        />       
    )
}

InventoryMenuItem.propTypes = {

}

export default InventoryMenuItem
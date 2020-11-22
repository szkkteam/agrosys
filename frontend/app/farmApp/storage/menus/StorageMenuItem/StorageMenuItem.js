import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import StorageIcon from '@material-ui/icons/Storage';
import { MenuItem } from 'components'
 
const StorageMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.StorageList}
            IconComponent={StorageIcon}
            {...rest}
        />       
    )
}

StorageMenuItem.propTypes = {

}

export default StorageMenuItem
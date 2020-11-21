import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import AddIcon from '@material-ui/icons/Add';
import { MenuItem } from 'components'
 
const ItemMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.ItemList}
            IconComponent={AddIcon}
            {...rest}
        />       
    )
}

ItemMenuItem.propTypes = {

}

export default ItemMenuItem
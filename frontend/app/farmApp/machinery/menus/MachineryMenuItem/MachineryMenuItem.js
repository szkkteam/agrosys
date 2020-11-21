import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { MenuItem } from 'components'
 
const MachineryMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.MachineryList}
            IconComponent={LocalShippingIcon}
            {...rest}
        />       
    )
}

MachineryMenuItem.propTypes = {

}

export default MachineryMenuItem
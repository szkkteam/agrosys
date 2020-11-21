import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import LocationCityIcon from '@material-ui/icons/LocationCity';
import { MenuItem } from 'components'

const EntityMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            route={ROUTES.EntityList}
            IconComponent={LocationCityIcon}
            {...rest}
        />       
    )
}

EntityMenuItem.propTypes = {

}

export default EntityMenuItem
import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'farmApp/routes'

import LocationCityIcon from '@material-ui/icons/LocationCity';
import { MenuItem } from 'components'

const EntityMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            to={ROUTES.EntityList}
            IconComponent={LocationCityIcon}
            {...rest}
        />       
    )
}

EntityMenuItem.propTypes = {

}

export default EntityMenuItem
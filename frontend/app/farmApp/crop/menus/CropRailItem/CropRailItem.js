import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'farmApp/routes'

import AutorenewIcon from '@material-ui/icons/Autorenew';
import { NavRailItem } from 'components/NavRail'
 
const CropRailItem = ({
    ...rest
}) => {
   
    return (
        <NavRailItem
            title={messages.title}
            to={ROUTES.Crop}
            IconComponent={AutorenewIcon}
            {...rest}
        />       
    )
}

CropRailItem.propTypes = {

}

export default CropRailItem
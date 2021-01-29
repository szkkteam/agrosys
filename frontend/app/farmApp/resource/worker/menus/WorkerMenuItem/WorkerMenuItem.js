import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import PeopleIcon from '@material-ui/icons/People';
import { MenuItem } from 'components'
 
const WorkerMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            to={ROUTES.ResourceWorker}
            IconComponent={PeopleIcon}
            {...rest}
        />       
    )
}

WorkerMenuItem.propTypes = {

}

export default WorkerMenuItem
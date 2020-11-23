import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { ROUTES } from 'routes'

import PublicIcon from '@material-ui/icons/Public';
import { MenuItem } from 'components'

const BlockMenuItem = ({
    ...rest
}) => {
   
    return (
        <MenuItem
            title={messages.title}
            to={ROUTES.BlockList}
            IconComponent={PublicIcon}
            {...rest}
        />       
    )
}

BlockMenuItem.propTypes = {

}

export default BlockMenuItem
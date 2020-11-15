import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'routes'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublicIcon from '@material-ui/icons/Public';

const BlockMenuItem = ({
    afterClick,
    ...rest
}) => {
    const intl = useIntl()
    const history = useHistory()

    const handleClick = () => {
        history.push(ROUTE_MAP[ROUTES.BlockList].toPath())
        afterClick && afterClick()
    }

    return (
        <ListItem
            button
            key={messages.title.id}
            onClick={handleClick}
            {...rest}
        >
              <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
              <ListItemText primary={intl.formatMessage(messages.title)} />
        </ListItem>
    )
}

BlockMenuItem.propTypes = {

}

export default BlockMenuItem
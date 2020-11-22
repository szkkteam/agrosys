import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'routes'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MenuItem = ({
    title,
    route,
    IconComponent,
    afterClick,
    ...rest
}) => {
    const intl = useIntl()
    const history = useHistory()

    const handleClick = () => {
        history.push(ROUTE_MAP[route].toPath())
        afterClick && afterClick()
    }

    return (
        <ListItem
            button
            key={title.id}
            onClick={handleClick}
            {...rest}
        >
              <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
              <ListItemText primary={intl.formatMessage(title)} />
        </ListItem>
    )
}

MenuItem.propTypes = {
    title: PropTypes.shape({
        id: PropTypes.string,  
        defaultMessage: PropTypes.string,
    }).isRequired,
    route: PropTypes.string.isRequired,
    IconComponent: PropTypes.object.isRequired,
    //route: PropTypes.instanceOf(ROUTE_MAP),
    afterClick: PropTypes.func,
}

export default MenuItem
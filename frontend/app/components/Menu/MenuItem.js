import React, { useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'
import { ROUTE_MAP } from 'routes'
import { withLinkComponent } from 'utils/hoc'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const LinkListItem = withLinkComponent(ListItem)

const MenuItem = ({
    title,
    to,
    params,
    dataProps=null,
    IconComponent,
    onClick,
    ...rest
}) => {
    const intl = useIntl()
    
    return (
        <LinkListItem
            button
            to={to}
            key={title.id}
            onClick={onClick}
            //{...rest}
        >
              <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
              <ListItemText primary={intl.formatMessage(title)} />
        </LinkListItem>
    )
}

MenuItem.propTypes = {
    title: PropTypes.shape({
        id: PropTypes.string,  
        defaultMessage: PropTypes.string,
    }).isRequired,
    to: PropTypes.string,
    params: PropTypes.object,
    dataProps: PropTypes.object,
    IconComponent: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default MenuItem
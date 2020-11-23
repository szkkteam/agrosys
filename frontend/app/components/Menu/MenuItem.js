import React, { useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'
import { ROUTE_MAP } from 'routes'


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
    const route = ROUTE_MAP[to]

    // TODO: Use debounced callback here
    // Maybe: https://github.com/xnimorz/use-debounce
    const maybePreloadComponent = () => {
        if (!route) {
            return
        }

        const { component } = route
        if (_.isFunction(component.preload)) {
            component.preload()
        }
    }

    const LoadableLink = useMemo(
        () => forwardRef((linkProps, ref) => 
            <Link ref={ref} to={route ? { pathname: route.toPath(params), ...dataProps} : to} {...linkProps}/>)
        ,[to]
    )

    return (
        <ListItem
            button
            component={LoadableLink}
            key={title.id}
            onClick={onClick}
            onMouseOver={maybePreloadComponent}
            //{...rest}
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
    to: PropTypes.string,
    params: PropTypes.object,
    dataProps: PropTypes.object,
    IconComponent: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default MenuItem
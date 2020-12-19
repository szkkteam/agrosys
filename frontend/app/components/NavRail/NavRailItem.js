import React, { useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl';
import { useRouteMatch } from 'react-router-dom'
import { ROUTE_MAP } from 'routes'
import { withLinkComponent } from 'utils/hoc'

import {
    ListItem,
    Typography
} from '@material-ui/core';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const LinkListItem = withLinkComponent(ListItem)

const StyledLinkListItem = styled(LinkListItem)`
    text-align: center;
    width: 72px;
    height: 72px;
    padding: 0;
`

const Container = styled.div`
    width: 100%;
`

const Title = styled(Typography)`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.75rem;
    font-weight: 400
    line-height: 1.4rem;
`


const NavRailItem = ({
    title,
    to,
    params,
    dataProps=null,
    IconComponent,
    onClick,
    ...rest
}) => {
    const route = ROUTE_MAP[to]
    const match = useRouteMatch({ path: route?.path, ...route.props})
    const selectedProps = match? { color: "primary" } : {}

    return (
        <StyledLinkListItem
            button
            to={to}
            key={title.id}
            onClick={onClick}
            //{...rest}
        >
            <Container>
                <IconComponent {...selectedProps}/>
                <Title variant="body2" {...selectedProps}>
                    <FormattedMessage {...title} />
                </Title>                
            </Container>
        </StyledLinkListItem>
    )
}

NavRailItem.propTypes = {
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

export default NavRailItem
import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useParams, Switch } from "react-router-dom";
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'
import { useFormatTitle } from 'utils/hooks'

import {
    Button
} from '@material-ui/core'

import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardSettings from '../Card/CardSettings'
import CardFab from '../Card/CardFab'

const LinkButton = withLinkComponent(Button)

const WidgetMedium = ({
    title,
    subheader,
    headerProps={},
    headerChildren,
    primaryAction,
    link,
    children,
    ...props
}) => {
    const params = useParams()
    const formattedLinkTitle = useFormatTitle(link?.title)

    return (
        <Card
            spacing={[2, 2]}
        >
            <CardHeader
                color="primary"
                //shrinkHeader
                title={title}
                subheader={subheader}
                action={
                    <CardSettings 
                    />
                }
                {...headerProps}
            >
                {primaryAction && <CardFab
                    {...primaryAction}
                /> }
                {headerChildren}
            </CardHeader>
            {children}
            {link && <LinkButton
                to={link.to}
                params={{...params, ...link.params || {}}}
            >
                {formattedLinkTitle}
            </LinkButton> }
        </Card>  
    )
}

WidgetMedium.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    subheader: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    primaryAction: PropTypes.shape({        
        onClick: PropTypes.func.isRequired
    }),
    link: PropTypes.shape({
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,
        to: PropTypes.string.isRequired,
        params: PropTypes.object
    }),
    headerChildren: PropTypes.element
}

export default WidgetMedium
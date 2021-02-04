import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useParams, useRouteMatch, Redirect } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'routes'
import { withLinkComponent } from 'utils/hoc'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import {
    Portal,
    IconButton
} from '@material-ui/core';

const ButtonLink = withLinkComponent(IconButton)

import AppContext from 'components/AppContext'

import { Tabs, TabLink } from 'components'

import TabHeader from './TabHeader'

const BackIcon = styled(ArrowBackIosIcon)`
    ${({theme}) => `
        color: ${theme.palette.primary.contrastText};
    `}
    
`

const PageHeader = ({
    prevLink,
    ...props
}) => {
    
    const {
        appBarTabsRef,
        appBarBackButtonRef,
    } = useContext(AppContext)
    
  
    return (
        <>
            {prevLink && <Portal container={appBarBackButtonRef.current}>
                <ButtonLink to={prevLink}>
                    <BackIcon />
                </ButtonLink>
            </Portal>}
            <Portal container={appBarTabsRef.current}>
                <TabHeader {...props} />
            </Portal>           
        </>
    )
}

PageHeader.propTypes = {
    /*
    items: PropTypes.arrayOf(PropTypes.shape({
        to: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
    })),
    value: PropTypes.any,
    redirectTo: PropTypes.string,
    */
}

export default PageHeader





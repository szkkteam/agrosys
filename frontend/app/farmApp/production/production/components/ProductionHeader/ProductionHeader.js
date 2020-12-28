import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'routes'

import {
    Grid,
    Typography,
    Portal
} from '@material-ui/core';

import AppContext from 'components/AppContext'

import { Tabs, TabLink } from 'components'


const StyledTab = styled(props => <TabLink {...props}/>)`
    ${({ theme }) => `
        &.Mui-selected {
            color: ${theme.palette.primary.main}
        }
    `}
    
`

const ProductionHeader = ({
    match: matchOriginal,
    location,
    ...props
}) => {
    const intl = useIntl()

    const {
        appBarTabsRef,
    } = useContext(AppContext)
    
    //const matched = location.pathname.match("(\/\\w+){2}")
    //const route = ROUTE_MAP[ROUTES.ProductionMultiView]  

    /**
     * TODO:
     * Get the earliest active production from the latest active season
     * or
     * Navigate to the dedicated crop summary view where all productions are listed
     * TODO:
     * Set back the previously viewed tab when the crop is changing
     */

    const items = [
        {cropId: 0, label: intl.formatMessage(messages.productionMultiView), to: ROUTES.CropOverview},
        {cropId: 1, productionId: 1, label: "My wheat", to: ROUTES.ProductionDetail},
        {cropId: 2, productionId: 2, label: "My corn", to: ROUTES.ProductionDetail},

        //{id: 3, label: "My asdasd", to: ROUTES.ProductionDetail},
        //{id: 4, label: "My bbbbb", to: ROUTES.ProductionDetail},
    ]

    let value = 0
    const route = ROUTE_MAP[ROUTES.ProductionDetail]
    const match = useRouteMatch({ path: route.path, ...route.props, })
    if (match) {
        value = parseInt(match.params.cropId)

    }
    
    return (
        <Portal container={appBarTabsRef.current}>
            <Tabs
                value={value}
                orientation="horizontal"
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{
                    style: {
                        height: "85%",
                        backgroundColor: "white",
                        zIndex: "-1",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",

                    }
                }}
            >
                { items && items.map((item, i) => {
                    const { to, label, ...params } = item
                    return <StyledTab key={i} to={to} label={label} params={{...params}} value={params.cropId} />
                }
                        
                )}
            </Tabs>
        </Portal>           
    )
}

ProductionHeader.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

export default ProductionHeader





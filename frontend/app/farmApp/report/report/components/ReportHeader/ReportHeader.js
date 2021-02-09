import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useParams, useRouteMatch, Redirect } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { PageHeader } from 'components'

import {
    TAB_COUNTRY,
    TAB_RESOURCE
} from '../../constants'

const ReportHeader = ({
    ...props
}) => {
    const intl = useIntl()
    
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
        
        {value: TAB_COUNTRY, label: intl.formatMessage(messages.tabResourceTitle), to: ROUTES.ReportResource},
        {value: TAB_RESOURCE, label: intl.formatMessage(messages.tabCountryTitle), to: ROUTES.ReportCountry},
    ]

    //const { cropId = "0" } = useParams()


    let value = null
    items.map(({ to, value: tabValue }) => {
        const route = ROUTE_MAP[to]
        const matched = useRouteMatch({ path: route?.path, ...route.props})
        if (matched) {
            value = tabValue
        }
    })
    
    return (
        <PageHeader 
            items={items}
            value={value}
           
        />                 
    )
}

ReportHeader.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

export default ReportHeader





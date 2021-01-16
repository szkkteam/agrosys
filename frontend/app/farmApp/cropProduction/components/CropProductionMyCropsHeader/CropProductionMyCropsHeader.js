import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useParams, useRouteMatch, Redirect } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'routes'

import { usePageTitle } from 'utils/hooks'

import { PageHeader } from 'components'

const CropProductionMyCropsHeader = ({
    ...props
}) => {
    const intl = useIntl()

    usePageTitle(messages.title)
    
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
        {cropId: 0, value: 0, label: intl.formatMessage(messages.productionMultiView), to: ROUTES.Crop},
        {cropId: 1, value: 1, productionId: 1, label: "My wheat", to: ROUTES.Production},
        {cropId: 2, value: 2, productionId: 2, label: "My corn", to: ROUTES.Production},
    ]

    //const { cropId = "0" } = useParams()

    let cropId = null
    let foundMatch = null
    items.map(({ to, cropId: tabValue }) => {
        const route = ROUTE_MAP[to]
        const matched = useRouteMatch({ path: route?.path, ...route.props})
        if (matched) {
            foundMatch = matched
            cropId = matched.params.cropId || "0"
        }
    })
    console.debug("foundMatch: ", foundMatch)
    console.debug("cropId: ", cropId)
    
    return (
        <PageHeader 
            items={items}
            value={foundMatch? parseInt(cropId) : null}
            redirectTo={ROUTES.Crop}
            
        />                 
    )
}

CropProductionMyCropsHeader.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

export default CropProductionMyCropsHeader






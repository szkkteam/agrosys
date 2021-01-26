import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useParams, useRouteMatch, Redirect } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'routes'

import { usePageTitle } from 'utils/hooks'

import { PageHeader } from 'components'

import { useFetchUserCrops } from 'farmApp/cropProduction/crop/hooks'

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

    const { payload: userCrops, isLoading } = useFetchUserCrops()

    const items = [
        {cropId: 0, value: 0, label: intl.formatMessage(messages.productionMultiView), to: ROUTES.Crop},
    ]

    const tabItems = useMemo(() => {

        const userCropTabs = userCrops.map(x => ({
            cropId: x.id,
            value: x.id,
            productionId: 1, // FIXME: This is hardcoded now. We need a more sofisticated selector later
            label: x.title,
            to: ROUTES.Production,
        }))
        if (isLoading) {
            return items
        } else {
            return _.concat(items, userCropTabs)
        }
        
    }, [userCrops, isLoading])

    //const { cropId = "0" } = useParams()

    let cropId = null
    let foundMatch = null
    tabItems.map(({ to, cropId: tabValue }) => {
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
            items={tabItems}
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






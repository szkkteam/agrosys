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
    //const isLoading = true
    //const userCrops = []


    const items = [
        {value: "0", label: intl.formatMessage(messages.productionMultiView), to: ROUTES.Crop},
    ]

    const tabItems = useMemo(() => {

        const userCropTabs = userCrops.map(({id, title}) => ({
            params: {cropId: id},
            value: id.toString(),
            label: title,
            to: ROUTES.CropProductionSeason,
        }))
        if (isLoading) {
            return items
        } else {
            return _.concat(items, userCropTabs)
        }
        
    }, [userCrops, isLoading])


    let value = null
    let foundMatch = null
    {
        const route = ROUTE_MAP[ROUTES.CropDetail]
        const matched = useRouteMatch({ path: route?.path, ...route.props})   
        if (matched) {
            foundMatch = matched
            value = matched.params.cropId
        }
    }
    

    if (!foundMatch) {
        const route = ROUTE_MAP[ROUTES.Crop]
        const matched = useRouteMatch({ path: route?.path, ...route.props})  
        if (matched) {
            foundMatch = matched
            value = "0"
        }
    }
    console.debug("tabItems: ", tabItems)
    console.debug("foundMatch: ", foundMatch)
    console.debug("value: ", value)
    
    return (
        <PageHeader 
            items={tabItems}
            value={foundMatch? value : null}
            redirectTo={ROUTES.Crop}
            
        />                 
    )
}

CropProductionMyCropsHeader.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

export default CropProductionMyCropsHeader






import React, { useContext, useMemo, useState, forwardRef, useEffect } from 'react'
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

    useEffect(() => {
        console.debug("Mount - CropProductionMyCropsHeader")
        return () => {
            console.debug("unmount - CropProductionMyCropsHeader")
        }
    }, [])

    const items = [
        {label: intl.formatMessage(messages.productionMultiView), to: ROUTES.Crop},
        {label: intl.formatMessage(messages.cropDashboard), to: ROUTES.CropDashboard},
    ]

    return (
        <PageHeader 
            items={items}
            redirectTo={ROUTES.Crop}
            
        />                 
    )
}

CropProductionMyCropsHeader.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

export default CropProductionMyCropsHeader






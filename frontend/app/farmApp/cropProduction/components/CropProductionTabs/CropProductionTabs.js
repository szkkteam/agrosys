import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { TabsRoute } from 'components'

import { useFetchUserCrops } from 'farmApp/cropProduction/crop/hooks'

const CropProductionTabs = ({

}) => {
    const intl = useIntl()

    const { payload, isLoading } = useFetchUserCrops()
    

    const fixedRoute = [
        {to: ROUTES.CropProductionOverview, value: {cropId: "all" },  label: intl.formatMessage(messages.overview) },
    ]

    const routes = useMemo(() => {
        if (isLoading) return fixedRoute
        return _.concat(fixedRoute, payload.map(({id, title: label}) => ({
            to: ROUTES.CropProductionOverview,
            value: { cropId: id.toString() },
            label
        })))
    }, [isLoading, payload])

    console.debug("payload: ", payload)

    return (
        <TabsRoute
            valueAccessor='cropId'
            items={routes}
        />
    )
}

CropProductionTabs.propTypes = {

}

export default React.memo(CropProductionTabs)
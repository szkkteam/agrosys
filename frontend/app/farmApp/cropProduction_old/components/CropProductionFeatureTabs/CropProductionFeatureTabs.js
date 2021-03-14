import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { TabsRoute } from 'components'


const CropProductionFeatureTabs = ({

}) => {
    const intl = useIntl()


    const routes = [
        {to: ROUTES.CropProductionTask, value: {tab: "tasks" },  label: intl.formatMessage(messages.task) },
        {to: ROUTES.CropProductionField, value: {tab: "fields" },  label: intl.formatMessage(messages.field) },
    ]

    return (
        <TabsRoute
            valueAccessor='tab'
            items={routes}
        />
    )
}

CropProductionFeatureTabs.propTypes = {

}

export default React.memo(CropProductionFeatureTabs)
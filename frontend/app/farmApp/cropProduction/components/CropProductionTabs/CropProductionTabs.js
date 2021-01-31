import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { TabsRoute } from 'components'

const CropProductionTabs = ({

}) => {
    const intl = useIntl()

    const routes = [
        {to: ROUTES.CropProductionOverview, value: {cropId: "all" },  label: intl.formatMessage(messages.overview) },
        {to: ROUTES.CropProductionOverview, value: {cropId: '1' }, label: 'My wheat' },
        {to: ROUTES.CropProductionOverview, value: {cropId: '2' }, label: 'My corn' },

    ]

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
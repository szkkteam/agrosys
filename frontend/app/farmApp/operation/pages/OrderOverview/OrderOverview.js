import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { useParams, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import {
    MasterDetail
} from 'components'

import {
    OrderMaster,
    OrderDetail
} from 'farmApp/operation/order/components'

export default ({
    ...props
}) => {
    const intl = useIntl()
    const { id } = useParams()

    if (!id) {
        // TODO: Only if screen size is greater than tablet
        const route = ROUTE_MAP[ROUTES.OperationOrderOverview].toPath({id: 1})
        return <Redirect to={route} />
    } else {
        return (
            <>
                <Helmet>
                    <title>
                        {intl.formatMessage(messages.title)}
                    </title>
                </Helmet>
                <MasterDetail
                    spacing={0}
                >
                    <OrderMaster />
                    <OrderDetail />
                </MasterDetail>
            </>
        )
    }

    
}

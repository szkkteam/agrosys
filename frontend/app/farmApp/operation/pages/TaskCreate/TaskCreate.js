import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import messages from 'farmApp/operation/messages';
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import {
    Container
} from '@material-ui/core'

import {
    MinimalLayout,
    AppBar
} from 'farmApp/components'


import {
    TaskCreate
} from 'farmApp/operation/task/components'


export default ({
    location,
    ...props
}) => {
    const intl = useIntl()
    const { season } = useParams()

    const links = [
        {title: messages.title, to: ROUTES.Operation},
        {title: messages.task, to: ROUTES.OperationTaskMap},
        {title: messages.operationCreate, to: ROUTES.OperationTaskCreate, params: {season}},
    ]

    const {
        goUpRoute={to: ROUTES.OperationViews},
        taskType="",
        redirect={to: ROUTES.OperationViews},
    } = location.state
    
    console.debug("state: ", location.state)
    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.operationCreate)}
                </title>
            </Helmet>
            <AppBar
                goUpRoute={goUpRoute}
                title={messages.title}
            />
            <MinimalLayout
                overflow='auto'
                containerProps={{
                    component: Container,
                    maxWidth: 'lg',
                    overflow: 'initial',
                    pb: 10
                }}
                title={messages.operationCreate}
                breadcrumbs={{
                    links
                }}
            >
                <TaskCreate
                    initialValues={{
                        season,
                        taskType
                    }}

                />
            </MinimalLayout>
        </>
    )
}

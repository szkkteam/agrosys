import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import globalMessage from 'messages'
import messages from 'farmApp/operation/messages';
import { useIntl, FormattedMessage } from 'react-intl'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'
import { ROUTES } from 'farmApp/routes'

import {
    ItemMenu
} from 'components'

import {
    Container,
    Button
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
    MinimalLayout,
} from 'farmApp/components'

import {
    AppBar
} from 'farmApp/components'

import {
    TaskAddTreatmentButton,
    TaskDetail
} from 'farmApp/operation/task/components'

const EditButton = styled(Button)`
    ${spacing}
`

export default ({
    location,
    ...props
}) => {
    const intl = useIntl()
    const { id } = useParams()

    // TODO: Get from the data
    const cropPlanTitle = "Őszi búza 2020"
    const taskType = 'harvest'

    const pageTitle = {
        ...messages.operationDetail,
        values: {
            task: intl.formatMessage(globalMessage[taskType]),
            crop: cropPlanTitle
        }
    }

    const links = [
        {title: messages.title, to: ROUTES.Operation},
        {title: messages.task, to: ROUTES.OperationTaskMap},
        {title: pageTitle, to: ROUTES.OperationTaskDetail, params: {id}},
    ]
    const {
        goUpRoute={to: ROUTES.OperationViews},
    } = location.state



    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
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
                title={pageTitle}
                breadcrumbs={{
                    links
                }}
                action={
                    <>
                        <EditButton
                            mx={2}
                            color="primary"
                        >
                            <FormattedMessage {...globalMessage.edit} />
                        </EditButton>
                        <ItemMenu
                            icon={MoreVertIcon}
                            items={[
                                {title: globalMessage.delete, onClick: () => null }
                            ]}
                        />
                    </>
                }
            >
                <TaskDetail
                    id={id}
                />
            </MinimalLayout>
        </>
    )
}

import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from 'farmApp/resource/field/messages';
import domainMessages from 'farmApp/resource/messages'

import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import { 
    FieldCreate,
} from 'farmApp/resource/field/components'

import {
    Container
} from '@material-ui/core'

import {
    MinimalLayout,
    AppBar
} from 'farmApp/components'


export default ({
    ...rest  
}) => {
    const intl = useIntl()

    const links = [
        {title: domainMessages.title, to: ROUTES.Resource},
        {title: messages.title, to: ROUTES.ResourceField}, 
        {title: messages.fieldCreate, to: ROUTES.ResourceFieldCreateDraw},
    ]


    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <AppBar
                goUpRoute={{
                    to: ROUTES.ResourceField
                }}
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
                title={messages.fieldCreate}
                breadcrumbs={{
                    links
                }}
            >
                <FieldCreate
                    //startDraw={false}
                    startDraw={true}
                />
            </MinimalLayout>

        </>
    )
}

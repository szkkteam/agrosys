import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import localMessages from './messages';
import messages from 'farmApp/resource/field/messages';
import domainMessages from 'farmApp/resource/messages'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import { 
    FieldDetail,
} from 'farmApp/resource/field/components'

import {
    Container
} from '@material-ui/core'

import {
    MinimalLayout,
    AppBar
} from 'farmApp/components'


/**
 * 1) Render a form component
 * 2) Make the form steppable
 * 3) On the first page render the map and wait for the geometry
 * 4) On the second page, fill out the other data
 * 5) The user can jump back to the map to modify the geometry
 * 6) When everything is okay, send the form data to the server and render the /fields/<id newly created>/?view=map route
 */


export default ({
    ...rest  
}) => {
    const intl = useIntl()
    const { id } = useParams()
        

    const links = [
        {title: domainMessages.title, to: ROUTES.Resource},
        {title: messages.title, to: ROUTES.ResourceField}, 
        {title: messages.fieldEdit, to: ROUTES.ResourceFieldEdit, params: {id}},
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
                title={{
                    values: { fieldTitle: 'Saját földem 1' },
                    ...localMessages.title}}
                breadcrumbs={{
                    links
                }}
            >
                <FieldDetail
                />
            </MinimalLayout>
        </>
    )
}

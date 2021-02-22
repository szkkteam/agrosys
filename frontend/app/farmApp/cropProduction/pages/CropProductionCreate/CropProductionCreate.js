import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import { AppBar } from 'farmApp/components'
import { PlanCreateForm } from 'farmApp/cropProduction/plan/components'


export default ({    
    ...props
}) => {

    const intl = useIntl()
   
    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <AppBar
                goUpRoute={{
                    to: ROUTES.CropProductionOverview
                }}
                title={messages.title}
            />
            <PlanCreateForm
            />
        </>
    )
}

// <CropProductionOverviewLayout />
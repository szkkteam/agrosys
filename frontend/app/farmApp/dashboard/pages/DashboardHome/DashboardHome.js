import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import domainMessages from 'farmApp/dashboard/messages'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    DashboardLayout
} from 'farmApp/components'

import { DashboardOverviewLayout } from '../../components'

export default ({

}) => {
    const intl = useIntl()

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(domainMessages.dashboard)}
                </title>
            </Helmet>
            <DashboardLayout
                headerProps={{
                    title: messages.title,
                    subheader: messages.subheader
                }}
            
            >
                <DashboardOverviewLayout
                />
            </DashboardLayout>
        </>
    )
}

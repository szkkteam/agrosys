import React, { useState } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { AppBar } from 'farmApp/components'

import { 
    CropProductionOverviewLayout
} from '../../components'


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
                title={messages.title}
            />            
            <CropProductionOverviewLayout
            />
        </>
    )
}
//<CropProductionOverviewLayout />

// 
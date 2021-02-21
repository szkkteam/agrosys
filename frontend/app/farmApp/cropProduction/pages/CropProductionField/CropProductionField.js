import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { FieldProductionLayout } from 'farmApp/cropProduction/fieldProduction/components'

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
            <FieldProductionLayout
            />
        </>
    )
}

// <CropProductionOverviewLayout />
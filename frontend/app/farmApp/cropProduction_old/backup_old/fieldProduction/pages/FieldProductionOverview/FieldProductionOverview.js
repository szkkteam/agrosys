import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import { SeasonAppBar } from 'farmApp/cropProduction/season/components'
import { FieldProductionLayout } from '../../components'

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
            <SeasonAppBar
                title={messages.title}
            />
            <FieldProductionLayout
            />
        </>
    )
}

/*
<FieldLayout

            />
*/
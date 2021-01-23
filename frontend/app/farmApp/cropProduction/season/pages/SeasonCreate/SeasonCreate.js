import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import { PlanCreateForm } from 'farmApp/cropProduction/plan/components'

export default ({
    location,
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
            <PlanCreateForm
                initialValues={location.state.initialValues}
            />
        </>
    )
}

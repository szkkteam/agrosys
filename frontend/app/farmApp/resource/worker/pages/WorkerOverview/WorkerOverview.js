import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import { withLinkComponent } from 'utils/hoc'
import { ResourceAppBar } from 'farmApp/resource/components'

import { Button } from "@material-ui/core";

const Link = withLinkComponent(Button)

export default ({

}) => {
    const intl = useIntl()

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <div>Overview</div>
        </>
    )
}
/*
            <Link to={ROUTES.}>                
                Go to machinery database
            </Link>
*/

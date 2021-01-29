import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import { withLinkComponent } from 'utils/hoc'
import { ResourceAppBar } from 'farmApp/resource/components'

import { 
    MachineryLayout,
} from '../../components'

import { Button } from "@material-ui/core";

const Link = withLinkComponent(Button)

import { TabsRoute } from 'components'

export default ({

}) => {
    const intl = useIntl()

    useEffect(() => {

        console.debug("MachineryOverview - mount")
    }, [])

    const items = [
        {to: ROUTES.TESTA, label: 'test 1'},
        {to: ROUTES.TESTB, label: 'test 2'},
    ]

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <Link to={ROUTES.MachineryDatabase}>                
                Go to machinery database
            </Link>
            <TabsRoute 
                items={items}
            />
        </>
    )
}
/*
            
*/

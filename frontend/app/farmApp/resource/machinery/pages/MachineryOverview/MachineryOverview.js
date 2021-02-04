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
            <Link to={ROUTES.MachineryDatabase}>                
                Go to machinery database
            </Link>
            <div>
                following content should be placed
                <ul>
                    <li>1 row for quick filter. Like in wallet, select a machine by chips if too many palce ... button which is a popup. Also a add machine button</li>
                    <li>1 row for quick stats, like fuel usage, working hours, etc ...</li>
                    <li>1 row for which shows 5-10-15 machine and some quick data. Show more button will navigate to the table</li>
                    <li>1 row for which shows a small calendar/a list of reservations. Show more button will navigate to the table</li>
                </ul>
            </div>
        </>
    )
}
/*
            
*/

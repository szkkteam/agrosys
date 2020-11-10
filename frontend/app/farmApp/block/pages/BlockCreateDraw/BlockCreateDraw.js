import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import { PageContent, HeaderContent } from 'components'

import { BlockCreateForm } from '../../components'
import { BlockDrawPage } from '../../components/BlockCreatePages'

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
    return (
        <PageContent>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
                <BlockCreateForm
                    pages={[
                        BlockDrawPage
                    ]}
                />

        </PageContent>
    )
}
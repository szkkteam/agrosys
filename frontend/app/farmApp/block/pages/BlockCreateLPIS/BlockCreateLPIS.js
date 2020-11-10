import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import { PageContent, HeaderContent } from 'components'

/**
 * 1) Render a form componenet
 * 2) Make the form steppable
 * 3) Render a map component with a MePAR provider toolbox (input data, filter) on the first page
 * 4) User can select blocks on map, or type in the toolbox to highlight the block
 * 5) Render the form navigation button
 * 6) On the second page, fill out the other data, prefilled by MePAR
 * 7) The user can jump back to the map to modify the geometry or select new block
 * 8) When everything is okay, send the form data to the server and render the /fields/<id newly created>/?view=map route
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
            <div>
                Select field from MePAR
            </div>
        </PageContent>
    )
}
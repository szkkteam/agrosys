import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import { PageContent, HeaderContent } from 'components'

// 1) Load the initial map drawing screen
// 2) On componenet did mount, trigger the modal window.
// 3)


export default ({
    ...rest  
}) => {
    const intl = useIntl()
    return (
        <div>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <div>
                Upload new fields
            </div>
        </div>
    )
}
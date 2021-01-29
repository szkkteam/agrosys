import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

import { 
    MachineryTable,
} from '../../components'

export default ({
    history,
    match,
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
            <div>Table view</div>
        </>
    )
}

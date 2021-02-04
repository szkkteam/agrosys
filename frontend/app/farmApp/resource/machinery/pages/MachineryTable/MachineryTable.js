import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

import { 
    MachineryTableAppBar,
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
            <MachineryTableAppBar
                title={messages.title}
            />
            <div>Header, filters, table management, etc</div>
        </>
    )
}

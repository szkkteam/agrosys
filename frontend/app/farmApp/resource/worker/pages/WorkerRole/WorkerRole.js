import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

import {
    WorkerTableAppBar
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
            <WorkerTableAppBar
                title={messages.title}
            />
            <div>Worker - role Header, filters, table management, etc</div>
        </>
    )
}

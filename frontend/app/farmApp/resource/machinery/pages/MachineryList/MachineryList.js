import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

import { 
    MachineryLayout,
} from '../../components'

export default ({
    history,
    match,
    ...props
}) => {
    const intl = useIntl()

    return (
        <div style={{height: "100%"}}>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <MachineryLayout />
        </div>
    )
}

import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

export default ({
    history,
    match,
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
            <div>Detail view</div>
        </div>
    )
}
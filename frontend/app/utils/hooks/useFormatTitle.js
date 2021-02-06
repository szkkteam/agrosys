import React, { useMemo } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'

export default (title, FormatComponent=FormattedMessage) => {

    const formattedTitle = useMemo(() => {
        return typeof(title) === 'object' ?
        (
            <FormatComponent {...title} />
        ) : title
    }, [title])
    return formattedTitle
}

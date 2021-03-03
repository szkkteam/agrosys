import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'


export default ({
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
            <div>OperationTableOverview</div>
        </>
    )
}

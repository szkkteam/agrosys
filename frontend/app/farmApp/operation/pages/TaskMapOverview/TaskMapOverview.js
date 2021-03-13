import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import messages from 'farmApp/operation/messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import {
    MasterDetail
} from 'components'

import { 
    TaskMapMaster,
    TaskMapDetail
} from 'farmApp/operation/task/components'

export default ({
    ...props
}) => {
    const intl = useIntl()
    // TODO: Season getter?

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.task)}
                </title>
            </Helmet>
            <MasterDetail
                spacing={0}
            >
                <TaskMapMaster
                />
                <TaskMapDetail
                />
            </MasterDetail>
        </>
    )
}

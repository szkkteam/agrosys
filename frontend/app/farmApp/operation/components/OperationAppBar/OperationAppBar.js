import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from 'farmApp/operation/messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { AppBar } from 'farmApp/components'

import OperationTabs from '../OperationTabs/OperationTabs'

const OperationAppBar = ({

}) => {

    return (
        <AppBar
            title={messages.appBarTitle}
        >
            <OperationTabs />
        </AppBar>
    )
}

OperationAppBar.propTypes = {

}

export default React.memo(OperationAppBar)
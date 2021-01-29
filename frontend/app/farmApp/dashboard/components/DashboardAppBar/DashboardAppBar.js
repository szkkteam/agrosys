import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { AppBar } from 'farmApp/components'

import DashboardTabs from '../DashboardTabs/DashboardTabs'

const DashboardAppBar = ({

}) => {
    return (
        <AppBar
            title={messages.title}
        >
            <DashboardTabs />
        </AppBar>
    )
}

DashboardAppBar.propTypes = {

}

export default DashboardAppBar
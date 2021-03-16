import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import domainMessages from 'farmApp/dashboard/messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { AppBar } from 'farmApp/components'

import DashboardTabs from '../DashboardTabs/DashboardTabs'

const DashboardAppBar = ({

}) => {
    return (
        <AppBar
            title={domainMessages.dashboard}
        >
            <DashboardTabs />
        </AppBar>
    )
}

DashboardAppBar.propTypes = {

}

export default DashboardAppBar
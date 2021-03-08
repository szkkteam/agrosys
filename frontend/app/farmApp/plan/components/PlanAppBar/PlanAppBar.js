import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from 'farmApp/plan/messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { AppBar } from 'farmApp/components'

import PlanTabs from '../PlanTabs/PlanTabs'

const PlanAppBar = ({

}) => {

    return (
        <AppBar
            title={messages.appBarTitle}
        >
            <PlanTabs />
        </AppBar>
    )
}

PlanAppBar.propTypes = {

}

export default React.memo(PlanAppBar)
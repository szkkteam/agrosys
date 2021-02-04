import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { AppBar } from 'farmApp/components'

import CropProductionTabs from '../CropProductionTabs/CropProductionTabs'

const CropProductionAppBar = ({

}) => {

    return (
        <AppBar
            title={messages.title}
        >
            <CropProductionTabs />
        </AppBar>
    )
}

CropProductionAppBar.propTypes = {

}

export default React.memo(CropProductionAppBar)
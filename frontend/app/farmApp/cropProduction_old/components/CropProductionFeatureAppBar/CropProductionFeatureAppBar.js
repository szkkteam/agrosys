import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import { AppBar } from 'farmApp/components'

import CropProductionFeatureTabs from '../CropProductionFeatureTabs/CropProductionFeatureTabs'

const CropProductionFeatureAppBar = ({
    
}) => {
    /**
     * TODO: Get if we are in a dedicated season, or also crop + season. Display the header according to it.
     */
    return (
        <AppBar
            title={messages.title}
            goUpRoute={{
                to: ROUTES.CropProductionOverview
            }}
        >
            <CropProductionFeatureTabs />
        </AppBar>
    )
}

CropProductionFeatureAppBar.propTypes = {

}

export default React.memo(CropProductionFeatureAppBar)
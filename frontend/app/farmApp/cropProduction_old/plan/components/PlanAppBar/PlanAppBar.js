import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { useParams } from 'react-router-dom'

import { AppBar } from 'farmApp/components'


//import ResourceTabs from '../ResourceTabs/ResourceTabs'

const PlanAppBar = ({
    ...props
}) => {
    const intl = useIntl()
    const { cropId, seasonId } = useParams()

    return (
        <AppBar
            goUpRoute={{
                to: seasonId? ROUTES.CropProductionSeason : ROUTES.CropProductionCrop,
                params: {cropId, seasonId}
            }}
            {...props}
        >
        </AppBar>
    )
}

PlanAppBar.propTypes = {

}

export default PlanAppBar
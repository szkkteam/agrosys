import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { useParams } from 'react-router-dom'

import { AppBar } from 'farmApp/components'


//import ResourceTabs from '../ResourceTabs/ResourceTabs'

const SeasonAppBar = ({
    title,
    ...props
}) => {
    const intl = useIntl()
    const { cropId, seasonId } = useParams()

    // TODO: Lookup for crop and season name
    const cropTitle = "My wheat"
    const seasonTitle = "Wheat 2020"

    const appTitle = `${cropTitle}`

    return (
        <AppBar
            goUpRoute={{
                to: seasonId? ROUTES.CropProductionSeason : ROUTES.CropProductionCrop,
                params: {cropId, seasonId}
            }}
            title={appTitle}
            {...props}
        >
        </AppBar>
    )
}

SeasonAppBar.propTypes = {

}

export default SeasonAppBar
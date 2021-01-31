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
    ...props
}) => {
    const { cropId } = useParams()

    return (
        <AppBar
            goUpRoute={{
                to: ROUTES.CropProductionOverview,
                params: {cropId}
            }}
            {...props}
        >
        </AppBar>
    )
}

SeasonAppBar.propTypes = {

}

export default SeasonAppBar
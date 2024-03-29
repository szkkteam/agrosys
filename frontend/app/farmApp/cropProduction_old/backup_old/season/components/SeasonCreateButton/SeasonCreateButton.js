import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import gobalMessages from 'messages'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useHistory, useLocation, Switch } from "react-router-dom";
import { withLinkComponent } from 'utils/hoc'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import PrimaryActionButton from 'components/Button/PrimaryActionButton'


import { SEASON_SELECTOR_DIALOG } from 'site/modalTypes'
import { MODAL_TYPE_CONFIRM } from 'site/modalResultTypes'
import { usePushModalWindow } from 'utils/hooks'

const SeasonCreateButton = ({
    cropId,
    ...props
}) => {

    const history = useHistory()

    const destination = ROUTE_MAP[ROUTES.CropProductionSeasonCreate]

    const push = usePushModalWindow()

    const openPlanSelector = () => {
        push(SEASON_SELECTOR_DIALOG, {}).then(({payload: initialValues = {}, status}) => {
            if (status === MODAL_TYPE_CONFIRM) {
                history.push({
                    // TODO: Get the cropId
                    pathname: destination.toPath({cropId}),      
                    state: { initialValues }
                })
            }
        })
    }

    return (
        <PrimaryActionButton
            title={messages.addNewTitle}
            onClick={openPlanSelector}
        />
    )
}

SeasonCreateButton.propTypes = {
    cropId: PropTypes.number.isRequired,
}

export default SeasonCreateButton
import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams, Switch } from "react-router-dom";
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'


import { SEASON_SELECTOR_DIALOG } from 'site/modalTypes'
import { MODAL_TYPE_CONFIRM } from 'site/modalResultTypes'
import { usePushModalWindow } from 'utils/hooks'

export default () => {
    const history = useHistory()

    const destination = ROUTE_MAP[ROUTES.CropProductionSeasonCreate]

    const push = usePushModalWindow()

    const { cropId: urlCropId } = useParams()

    return (cropId = urlCropId) => {
        return push(SEASON_SELECTOR_DIALOG, {}).then(({payload: initialValues = {}, status}) => {
            if (status === MODAL_TYPE_CONFIRM) {
                history.push({
                    // TODO: Get the cropId
                    pathname: destination.toPath({cropId}),      
                    state: { initialValues }
                })
            }
        })
    }
}

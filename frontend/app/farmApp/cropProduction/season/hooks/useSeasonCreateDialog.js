import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams, Switch } from "react-router-dom";
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'


import { SEASON_SELECTOR_DIALOG } from 'site/modalTypes'
import { usePushDialog } from 'utils/hooks'

export default (userCropId = null) => {
    const history = useHistory()
    const destination = ROUTE_MAP[ROUTES.CropProductionSeasonCreate]
    const { cropId: urlCropId } = useParams()
    return usePushDialog(SEASON_SELECTOR_DIALOG, (initialValues) => {
        history.push({
            // TODO: Get the cropId
            pathname: destination.toPath({cropId: userCropId ?? urlCropId}),      
            state: { initialValues }
        })
    })    
}

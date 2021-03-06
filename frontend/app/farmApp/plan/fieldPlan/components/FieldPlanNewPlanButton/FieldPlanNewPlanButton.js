import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { useSeasonSelectDialog } from '../../hooks'

import {
    PrimaryActionButton
} from 'components'


const FieldPlanNewPlanButton = ({

}) => {
    const history = useHistory()

    const seasonSelectDialog = useSeasonSelectDialog((payload) => {
        const { season } = payload
        const route = ROUTE_MAP[ROUTES.PlanFieldPlanCreate].toPath({season})
        history.push({
            pathname: route
        })
    })

    const openModal = () => {
        seasonSelectDialog()
    }

    // TODO: Debug
    /*
    useEffect(() => {
        seasonSelectDialog()
    }, [])
    */

    return (
        <PrimaryActionButton
            title={messages.title}
            onClick={openModal}
        />
    )
}

FieldPlanNewPlanButton.propTypes = {

}

export default FieldPlanNewPlanButton
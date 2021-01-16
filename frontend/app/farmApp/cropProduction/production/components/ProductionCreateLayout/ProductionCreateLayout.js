import React, { useState, useEffect, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { PLAN_SELECTOR_DIALOG } from 'site/modalTypes'
import { usePushModalWindow } from 'utils/hooks'

import {
    Button
} from '@material-ui/core'

import { PlanLayout } from 'farmApp/cropProduction/plan/components'
import { FieldSideSelector } from 'farmApp/cropProduction/field/components'

const ProductionCreateLayout = ({

}) => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const push = usePushModalWindow()

    const openPlanSelector = () => {
        push(PLAN_SELECTOR_DIALOG, {}).then((status) => {
            console.debug("Finished: ", status)
        })
    }

    // TODO: This should be a form. If the form is not pristine, dont open the dialog
    /* On mount, open the plan selector dialog */
    
    useEffect(() => {
        openPlanSelector()
    }, [])
    

    return (
        <PlanLayout
        />
        
    )
}

/*
<div>
            <div>Content</div>
            <Button
                onClick={() => setOpen(true)}
            >
                Open
            </Button>
            <FieldSideSelector
                open={open}
                onClose={handleClose}
            />
        </div>
*/

ProductionCreateLayout.propTypes = {

}

export default ProductionCreateLayout
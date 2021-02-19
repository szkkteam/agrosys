import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Spacing } from 'styles'

import {
        PrimaryButton,
    SecondaryButton,
} from 'components'

import {
    ExpandPanel
} from 'farmApp/components'

import PlanCropPanelSummary from '../PlanCropPanelSummary/PlanCropPanelSummary'
import PlanCropPanelDetail from '../PlanCropPanelDetail/PlanCropPanelDetail'

const GrowSeasonAccordion = ({
    expanded,
    onDelete,
    onEdit,
    onExpandChange,
}) => {
   
    return (
        <ExpandPanel        
            expanded={expanded}
            onExpandChange={onExpandChange}
            actionDisable
            summary={(props) => (
                <PlanCropPanelSummary {...props} />)
            }
            actions={
                <>
                    <SecondaryButton
                        //size="small"
                        onClick={onDelete}
                        title={globalMessages.delete}
                    />
                    <PrimaryButton 
                        //size="small"
                        onClick={onEdit}
                        title={globalMessages.edit}
                    />
                </>
            }
        >
            <PlanCropPanelDetail />                
        </ExpandPanel>
        
    )
}

GrowSeasonAccordion.propTypes = {

}

export default GrowSeasonAccordion
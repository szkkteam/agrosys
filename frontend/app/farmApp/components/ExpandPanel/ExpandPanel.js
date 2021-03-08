import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { PrimaryButton, SecondaryButton } from 'components'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    Button,
    
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionActions
} from '@material-ui/core'

const ColumnAccordion = styled(AccordionDetails)`
    flex-direction: column;
`

const CenterSummary = styled(AccordionSummary)`
    & > div {
        align-items: center;
    }
`

const Actions = styled(AccordionActions)`
    justify-content: flex-start;
`

const ExpandPanel = ({
    expanded,
    onExpandChange,
    summary,
    children,
    actions,
    actionDisable=false,
    secondaryButtonProps={},
    primaryButtonProps={},
    ...props
}) => {
   
    return (
        <Accordion
            expanded={expanded}
            onChange={onExpandChange}
            {...props}
            //elevation={2}
            //variant="elevation"
        >
            <CenterSummary
                expandIcon={<ExpandMoreIcon />}
            >
                {_.isFunction(summary)? (
                    summary({expanded})
                ): (
                    summary
                )}               
            </CenterSummary>
            <ColumnAccordion>
                {children}                
            </ColumnAccordion>
            {actions && 
            <>
                <Divider />
                <Actions>
                    {actions}
                </Actions> 
            </>
            }
            
        </Accordion>
    )
}
/*
{ !actionDisable? (
    <>
        <Divider />
        <AccordionActions>
            <SecondaryButton
                size="small"
                variant="text"
                {...secondaryButtonProps} 
            />
            <PrimaryButton 
                size="small"
                variant="text"
                {...primaryButtonProps} 
            />                
        </AccordionActions>
    </>) 
    : null 
}
*/


ExpandPanel.propTypes = {
    expanded: PropTypes.bool.isRequired,
    onExpandChange: PropTypes.func.isRequired,
    summary: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ]),
    actions: PropTypes.oneOfType([
        PropTypes.element,
    ]),
    //actionDisable: PropTypes.bool,
    //secondaryButtonProps: PropTypes.object,
    //primaryButtonProps: PropTypes.object,
}

export default ExpandPanel
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    BackButton,
} from 'components'

import { useStepperContext } from 'components/Stepper/hooks'

const PrimaryBackButton = styled(props => <BackButton {...props} />)`
    ${({ theme }) => `
        color: ${theme.palette.primary.main};
    `}
    margin-left: 15px;
    
`


const StepperBack = (props) => {

    const {
        activeStep,
        handleBack
    } = useStepperContext()

    return (
        <div>
            <PrimaryBackButton 
                onClick={handleBack}
                disabled={!activeStep}
                {...props}
            />
        </div>
    )
}

StepperBack.propTypes = {

}

export default StepperBack
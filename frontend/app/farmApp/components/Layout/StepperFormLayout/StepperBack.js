import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    SecondaryButton,
} from 'components'

import { useStepperContext } from 'components/Stepper/hooks'

const PrimaryBackButton = styled(props => <SecondaryButton {...props} />)`    
    margin: 0;
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
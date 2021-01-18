import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components'

import { useStepperContext } from '../hooks'

import { 
    Stepper,
    Step,
    StepButton,
    StepContent,
} from '@material-ui/core';

const StepperHeader = ({
    ...props
}) => {

    const {
        steps,
        activeStep,
        completed,
        handleStep
    } = useStepperContext()

    const bindHandleStep = (i) => () => {
        handleStep && handleStep(i)
    }

    const { orientation } = props

    return (
        <Stepper
            nonLinear
            activeStep={activeStep}
            {...props}
        >
            {steps.map((label, index) => (
                <Step key={`${index}`}>
                    <StepButton
                        onClick={bindHandleStep(index)}
                        //onClick={completed[index]? handleStep(index): null}
                        completed={completed[index]}
                    >
                        <FormattedMessage {...label} />
                    </StepButton>
                    { orientation && orientation === "vertical"
                        ? (<StepContent>
                            {renderStepContent()}
                        </StepContent>)
                        : null
                    }
                </Step>
            ))}
        </Stepper> 
    )
}

StepperHeader.propTypes = {

}

export default StepperHeader
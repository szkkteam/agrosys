import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components'

import StepperContext from './StepperContext'

const Stepper = ({
    defaultStep=0,
    steps,
    contents,
    children,
    ...props
}) => {

    const [activeStep, setActiveStep] = React.useState(defaultStep);

    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    }

    const completedSteps = () => {
        return Object.keys(completed).length;
    }

    const isLastStep = () => {
        return activeStep === totalSteps - 1;
    }

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps;
    }

    const handleNext = () => {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1
        setActiveStep(newActiveStep)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleStep = (step) => {
        setActiveStep(step)
    }

    const handleComplete = () => {
        console.log("Handle complete")
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        handleNext()
    }

    const handleReset = () => {
        setActiveStep(0)
        setCompleted({})
    }

    const contextObject = {
        contents,
        steps,
        activeStep,
        completed,
        handleStep,
        handleComplete,
        handleNext,
        handleBack,
        isLastStep: isLastStep(),
    }

    return (
        <StepperContext.Provider value={contextObject}>
            {children}
        </StepperContext.Provider>
    )
        
}


Stepper.propTypes = {
    defaultStep: PropTypes.number,
    steps: PropTypes.array,
}

export default Stepper
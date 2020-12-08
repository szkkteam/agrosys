import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Stepper as MuiStepper } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './stepper.scss'

const Stepper = ({
    defaultStep=0,
    steps,
    stepsVisible=true,
    contents,
    finishedContent=null
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
        return activeStep === totalSteps() - 1;
    }

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
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

    const handleStep = (step) => () => {
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

    const renderFinishedContent = finishedContent? typeof(finishedContent) == 'function'? finishedContent : () => finishedContent :  null
    const activeContent = typeof(contents[activeStep] ) == 'function'? contents[activeStep] : (props) => contents[activeStep]

    return (
        <div className="stepper-container">
            { stepsVisible && <MuiStepper
                nonLinear
                activeStep={activeStep}
            >
                {steps.map((label, index) => (
                    <Step key={`${label.id}-${index}`}>
                        <StepButton
                            onClick={handleStep(index)}
                            completed={completed[index]}
                        >
                            <FormattedMessage {...label} />
                        </StepButton>
                    </Step>
                ))}
            </MuiStepper> }
            { finishedContent && allStepsCompleted()? (
                <div>
                    { renderFinishedContent() }
                </div>
            ) : (
                <div style={{height: "100%"}}>
                    { activeContent({
                        numOfSteps: totalSteps,
                        completedSteps,
                        activeStep,
                        onComplete: handleComplete,
                        onNext: handleNext,
                        onBack: handleBack,
                    }) }
                </div>
            )
            }
        </div>
    )
}

Stepper.propTypes = {
    defaultStep: PropTypes.number,
    steps: PropTypes.array,
    contents: PropTypes.array
}

export default Stepper
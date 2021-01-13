import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components'

import {
    Portal
} from '@material-ui/core'

import { 
    Stepper as MuiStepper,
    Step,
    StepButton,
    StepContent,
    Button,
    Typography
} from '@material-ui/core';

const StepContentContainer = styled.div`
    height: 100%;
`

const Stepper = ({
    defaultStep=0,
    steps,
    stepsVisible=true,
    contents,
    finishedContent=null,
    className,
    contentRef=null,
    containerComponent: ContainerComponent = StepContentContainer,
    orientation="horizontal",
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

    //_.isFunction(contents[activeStep])
    //const activeContent = typeof(contents[activeStep] ) == 'function'? contents[activeStep] : (props) => contents[activeStep]
    const activeContent = contents[activeStep]

    const stepContentProps = {
        numOfSteps: totalSteps,
        completedSteps,
        activeStep,
        onComplete: handleComplete,
        onNext: handleNext,
        onBack: handleBack,
    }
    //console.debug("Stepper - contentRef: ", contentRef.current)
    const PortalContent = ({children, ...props}) => (
        <Portal container={contentRef.current}>
            {children}
        </Portal>
    )
    console.debug("Stepper render: ", ContainerComponent)
    //const ContentContainer = contentRef? PortalContent : ContainerComponent

    /*
    const renderStepContent = useMemo(() => {
        return () => finishedContent && allStepsCompleted()? (
                <div>
                    { renderFinishedContent() }
                </div>
            ) : (
                <ContainerComponent>
                    { _.isFunction(activeContent)
                        ? activeContent(stepContentProps)
                        : React.cloneElement(activeContent, stepContentProps)

                    }
                </ContainerComponent>
            )
    }, [activeContent, ContainerComponent])
    */

   const renderStepContent = () => 
        (
            <ContainerComponent>
                { _.isFunction(activeContent)
                    ? activeContent(stepContentProps)
                    : React.cloneElement(activeContent, stepContentProps)

                }
            </ContainerComponent>
        )

    return (
        <div
            className={className}
        >
            { stepsVisible && <MuiStepper
                nonLinear
                activeStep={activeStep}
                orientation={orientation}
                {...props}
            >
                {steps.map((label, index) => (
                    <Step key={`${index}`}>
                        <StepButton
                            onClick={handleStep(index)}
                            completed={completed[index]}
                        >
                            <FormattedMessage {...label} />
                        </StepButton>
                        { orientation === "vertical"
                            ? (<StepContent>
                                {renderStepContent()}
                            </StepContent>)
                            : null
                        }
                    </Step>
                ))}
            </MuiStepper> }
            { orientation === "horizontal"
                ? renderStepContent()
                : null
            }
        </div>
    )
}

/*
<StepButton
    onClick={handleStep(index)}
    completed={completed[index]}
>
    <FormattedMessage {...label} />
</StepButton>
*/

Stepper.propTypes = {
    defaultStep: PropTypes.number,
    steps: PropTypes.array,
    contents: PropTypes.array
}

export default Stepper
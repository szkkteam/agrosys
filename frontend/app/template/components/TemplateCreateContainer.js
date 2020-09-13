import React from 'react'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

import {
    CreateStep,
    FormScratchStep,
    FormTemplateStep,
    FormTaskDetailStep,
} from 'template/components'

const creationChoiceEnum = {
    NO_SELECTION: 0,
    CREATE_FROM_SCRATCH: 1,
    CREATE_FROM_TEMPLATE: 2,
}

const steps = ['Template title and production', 'Setup the tasks']

export default class TemplateCreateContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            creationChoice: creationChoiceEnum.NO_SELECTION,
            activeStep: 0,
            completed: {}
        }
    }

    onCreateFromScratch = () => {
        if (this.state.creationChoice != creationChoiceEnum.CREATE_FROM_SCRATCH) {
            // TODO: Clear the redux store
        }
        this.setState({
            creationChoice: creationChoiceEnum.CREATE_FROM_SCRATCH
        })
    }

    onCreateFromTemplate = () => {
        if (this.state.creationChoice != creationChoiceEnum.CREATE_FROM_TEMPLATE) {
            // TODO: Clear the redux store
        }
        this.setState({
            creationChoice: creationChoiceEnum.CREATE_FROM_TEMPLATE
        })
    }

    onResetChoice = () => {
        // TODO: Clear the redux store
        this.setState({
            creationChoice: creationChoiceEnum.NO_SELECTION
        })
    }


    totalSteps = () => {
        return steps.length
    }
    
    completedSteps = () => {
        return Object.keys(this.state.completed).length
    }

    isLastStep = () => {
        return this.state.activeStep === this.totalSteps() - 1
    }

    handleStep = (activeStep) => {
        this.setState({
            activeStep
        })
    }

    allStepsCompleted = () => {
        return this.completedSteps() === this.totalSteps()
    }

    handleNext = () => {
        const { activeStep } = this.state
        const newActiveStep = this.isLastStep() && !this.allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in this.state.completed))
        : activeStep + 1;
        this.setState({
            activeStep: newActiveStep
        });

    }

    handleComplete = () => {
        const { activeStep } = this.state
        const newCompleted = { ...this.state.completed }
        newCompleted[activeStep] = true;
        this.setState({
            completed: newCompleted,
        })
        this.handleNext()
    }

    render() {
        const { creationChoice, activeStep, onSubmit } = this.state

        console.log("creationChoice: ", creationChoice)
        return (
            <div>
                {
                    creationChoice === creationChoiceEnum.NO_SELECTION?
                    <CreateStep
                        onClickFromScratch={this.onCreateFromScratch}
                        onClickFromTemplate={this.onCreateFromTemplate}
                    /> :
                    <div>
                        <div>
                            <Stepper nonLinear activeStep={activeStep}>
                                {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepButton onClick={this.handleStep.bind(null, index)} completed={null}>
                                        {label}
                                    </StepButton>
                                </Step>
                                ))}
                            </Stepper>
                        </div>                    
                        <div>
                            { activeStep === 0 && creationChoice === creationChoiceEnum.CREATE_FROM_TEMPLATE?
                                <FormTemplateStep
                                    onClickBack={this.onResetChoice}
                                    onSubmit={this.handleComplete}
                                /> : activeStep === 0 && creationChoice === creationChoiceEnum.CREATE_FROM_SCRATCH?
                                <FormScratchStep
                                    onClickBack={this.onResetChoice}
                                    onSubmit={this.handleComplete}
                                /> : null
                            }
                            { activeStep === 1 &&
                                <FormTaskDetailStep
                                    onSubmit={onSubmit}
                                />
                            }
                        </div>
                    </div>
                }                                                
            </div>
        )
    }
}
import React from 'react'

const defaultValues = {
    contents: [],
    steps: [],
    activeStep: 0,
    completed: {},
    handleStep: null,
    handleComplete: null,
    handleBack: null,
    handleNext: null,
    isLastStep: false,
}

export default React.createContext(defaultValues)
import React from 'react'

const defaultValues = {
    contents: [],
    steps: [],
    activeStep: 0,
    completed: {},
    handleStep: null,
    handleComplete: null,
    handleBack: null,
    handleNext: null
}

export default React.createContext(defaultValues)
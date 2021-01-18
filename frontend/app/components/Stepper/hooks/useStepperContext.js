import React, { useContext } from 'react'
import StepperContext from '../StepperContext'

export default () => {
    const context = useContext(StepperContext)
    if (!context) {
        throw new Error(
        `Stepper compound components cannot be rendered outside the Stepper component`,
        )
    }
    return context
}
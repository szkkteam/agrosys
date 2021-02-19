import React from 'react'
import { useDispatch } from 'react-redux'


export default () => {
    const dispatch = useDispatch()

    return (action) => (value, formHelper) => {
        const { setErrors, setSubmitting } = formHelper
        action(value, dispatch, formHelper)
        .catch(({errors}) => {
            setErrors(errors)
            setSubmitting(false)                
        })       
    }
}
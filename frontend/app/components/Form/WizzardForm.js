import React, { useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, withFormik, yupToFormErrors } from "formik";

import StepperContext from './../Stepper/StepperContext'

const WizzardForm = ({
    className,
    initialValues,
    onSubmit,
    validate,
    children,
    ...parentProps
}) => {

    const [values, setValues] = useState(initialValues)

    const {
        contents,
        handleComplete,
        isLastStep,
        activeStep,
    } = useContext(StepperContext)

    const handleSubmit = (values, bag) => {
        handleComplete()
        if (isLastStep) {
            return onSubmit(values, bag)
        } else {
            setValues(values)
            bag.setSubmitting(false);
        }
    }

    const pageValidationSchema = useMemo(() => {
        const activePage = React.Children.toArray(children)[activeStep]
        return activePage.props.validationSchema? activePage.props.validationSchema : validationSchema
    }, [activeStep])

    const handleValidateForm = (values) => {
        const activePage = React.Children.toArray(children)[activeStep]
        return activePage.props.validationSchema? activePage.props.validationSchema(values) : validationSchema(values)
    }
    /*
    const handleValidate = (values) => {
        const activePage = React.Children.toArray(children)[activeStep]
        return activePage.props.validate? activePage.props.validate(values) : validate? validate() : {}
    }
    */

    const activePage = React.Children.toArray(children)[activeStep]

    return (
        <Formik
            initialValues={values}
            onSubmit={handleSubmit}            
            validateForm={handleValidateForm}
            validationSchema={pageValidationSchema}
        >
            {(props) => (
                <form className={className} onSubmit={props.handleSubmit}>
                    {_.isFunction(activePage) ? (
                        activePage({...parentProps, ...props})
                    ) : (
                        React.cloneElement(activePage, {...parentProps, ...props})
                    )}
                </form>
            )}
        </Formik>
    )
}

WizzardForm.Page = ({children, ...props}) => {
    return children
}

WizzardForm.propTypes = {
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    validate: PropTypes.func,
}

export default WizzardForm
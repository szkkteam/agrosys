import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components'

import { useStepperContext } from '../hooks'

const StepperContent = ({
    children,
    ...props
}) => {
    const {
        contents,
        activeStep,

        handleComplete,
        handleBack,
        handleNext,
    } = useStepperContext()

    const childProps = {
        activeStep,
        handleComplete,
        handleBack,
        handleNext,
    }
    if (_.isFunction(children))
        return children({...childProps, ...props})
    else if (contents && contents.length) {
        if (React.Children.toArray(children).length > 1) {
            const activeContent = React.Children.toArray(children)[activeStep]
            return React.cloneElement(activeContent, childProps)
        } else {
            const activeContent = contents[activeStep]
            return  (_.isFunction(activeContent)
                    ? activeContent(childProps)
                    : React.cloneElement(activeContent, childProps))
        }
        
    }
    else 
        return React.cloneElement(children, {...childProps, ...props})
}

StepperContent.propTypes = {

}

export default StepperContent
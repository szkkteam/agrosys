import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import DetailTabs from './DetailTabs'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    ${({ theme, height }) => `
        ${height? `height: ${height}px;` : ''}
    `}  
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    padding: 5px 15px;
`

const DetailContainer = ({
    tabs,
    defaultStep=0,
    height,
    children,
    ...props
}) => {

    //const [activeTab, activateTab] = useState(0)
    const [activeStep, setActiveStep] = React.useState(defaultStep);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return tabs.length
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

    const handleTabChange = (e, newValue) => {
        setActiveStep(newValue)
    }


    const handleComplete = () => {
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        handleNext()
    }

    const handleReset = () => {
        setActiveStep(0)
        setCompleted({})
    }

    //const renderFinishedContent = finishedContent? typeof(finishedContent) == 'function'? finishedContent : () => finishedContent :  null

    const { component } = tabs[activeStep]
    const tabLabels = tabs.map(({label}) => label)

    //<Tab label={intl.formatMessage(messages.generalTabTitle)} {...tabProps(0)} />
    return (
        <Container
            height={height}
        >
            <div>
                <DetailTabs
                    tabs={tabLabels}
                    value={activeStep}
                    onChange={handleTabChange}
                />
            </div>
            <Content>
                { _.isFunction(component)
                  ? component()
                  : React.cloneElement(component, {

                  })
                }
            </Content>
        </Container>
    )
}

DetailContainer.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.object.isRequired,
        value: PropTypes.any.isRequired,
        component: PropTypes.any.isRequired,
    }))
}

export default DetailContainer
import React, { useContext, useMemo, useState } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Formik, Field } from "formik";


import { 
    Modal,
    Stepper,
    StepperHeader,
    StepperContent,
    ModalHeader,
    ModalContent,
    StepperContext
} from 'components'

import {
    WizzardForm
} from 'components/Form'

import StepperBack from './StepperBack'

import CropPage from './CropPage'
import cropPageSchema from './cropPageSchema'
import TaskPage from './TaskPage'
import taskPageSchema from './taskPageSchema'


const Container = styled(props => <ModalContent {...props} />)`
    display: flex;
    flex-grow: 1;
    padding: 0;
    min-height: 400px;
    position: relative;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const StepperHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
`

const MediumStepperHeader = styled(props => <StepperHeader {...props} />)`
    width: 70%;
    margin: 0 auto;
`

const FlexWizzard = styled(WizzardForm)`
    flex-grow: 1;
`

const defaultInitialValues = {
    cropType: "",
    template: ""
}

const PlanCropForm = ({
    initialValues=defaultInitialValues
}) => {

    const steps = [
        messages.stepCrop,
        messages.stepSubsidy,
    ]
    
    return (
        <Flex>          
            <ModalHeader
                title={messages.title}
            />
            <Stepper
                steps={steps}
                //contents={contents}
                defaultStep={0}
            >
                <StepperHeaderContainer>
                    <StepperBack />
                    <MediumStepperHeader />
                </StepperHeaderContainer>
                
                <Container /*ref={ ref => setContainerRef(ref)}*/>
                    <FlexWizzard
                        initialValues={initialValues}
                    >
                        <CropPage validationSchema={cropPageSchema}/>
                        <TaskPage validationSchema={taskPageSchema}/>

                    </FlexWizzard>
                </Container>
            </Stepper>
        </Flex>     
    )
}

// {({activeStep, ...props}) =>  contents[activeStep](props)}

const PlanCropDialog = ({

}) => {
    return (
        <Modal
            fullWidth
            maxWidth="md"
        >   
            <PlanCropForm />
        </Modal>
        
    )
}
/*
<ConnectedCropForm
                initialValues={data}
                //onSubmit={handleSubmit}
                {...headerProps}
                {...props}
            />
*/

PlanCropDialog.propTypes = {

}

export default PlanCropDialog
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
import TaskPage from './TaskPage'
import FieldPage from './FieldPage'
import SubsidyPage from './SubsidyPage'
import FinancePage from './FinancePage'


const Container = styled(props => <ModalContent {...props} />)`
    display: flex;
    flex-grow: 1;
    padding: 0;
    padding-top: 35px;
    min-height: 450px;
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
    ...CropPage.initialValues,
    ...TaskPage.initialValues,
    ...FinancePage.initialValues,
    ...FieldPage.initialValues,
    ...SubsidyPage.initialValues,
}

const PlanCropForm = ({
    handleConfirm,
    initialValues=defaultInitialValues,
    ...props
}) => {
    console.debug("initialValues: ", initialValues)
    const steps = [
        messages.stepCrop,
        messages.stepTask,
        messages.stepField,
        messages.stepSubsidy,
        messages.stepFinance,
    ]


    const handleSubmit = (d) => {
        console.debug("Submitting ... : ", d)
        handleConfirm && handleConfirm(d)
    }
    
    return (
        <Flex>          
            <ModalHeader
                title={messages.title}
            />
            <Stepper
                steps={steps}
                //contents={contents}
                //defaultStep={2}
            >
                <StepperHeaderContainer>
                    <StepperBack />
                    <MediumStepperHeader />
                </StepperHeaderContainer>
                
                <Container /*ref={ ref => setContainerRef(ref)}*/>
                    <FlexWizzard
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        <CropPage validationSchema={CropPage.schema}/>
                        <TaskPage validationSchema={TaskPage.schema}/>
                        <FieldPage validationSchema={FieldPage.schema}/>
                        <SubsidyPage validationSchema={SubsidyPage.schema}/> 
                        <FinancePage validationSchema={FinancePage.schema}/>
                    </FlexWizzard>
                </Container>
            </Stepper>
        </Flex>     
    )
}

const PlanCropDialog = ({
    ...props
}) => {
    return (
        <Modal
            fullWidth
            fullScreen={true}
            maxWidth="md"
        >   
            <PlanCropForm
                {...props}
            />
        </Modal>
        
    )
}


PlanCropDialog.propTypes = {

}

export default PlanCropDialog
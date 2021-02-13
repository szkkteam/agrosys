import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import {useCallbackRef} from 'use-callback-ref';
import { useDispatch } from 'react-redux'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, destroy } from 'redux-form'

import { 
    Stepper,
    StepperHeader,
    StepperContent,
    ModalHeader,
    ModalContent,
} from 'components'

import {
    FieldProductionMainCropVariants,
    FieldProductionMainCropSubsidies,
    FieldProductionTasks,
} from 'farmApp/cropProduction/fieldProduction/components'

import StepperBack from './StepperBack'
import StepperFooter from './StepperFooter'

import { PRODUCTION_FORM_NAME } from '../../constants'

const Container = styled(props => <ModalContent {...props} />)`
    display: flex;
    flex-grow: 1;
    padding: 0;
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


const withForm = reduxForm({
    form: PRODUCTION_FORM_NAME,
    //validate,
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
})

const formSelector = formValueSelector(PRODUCTION_FORM_NAME)

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props

        const { fields, template } = formSelector(state, 'fields', 'template')
        return {        
            initialValues: {
                parcels: [],
                template: {
                    configuration: {
                        startDate: {
                            mode: 'automatic',
                            parameters: {},
                        },
                        features: {
                            chemicalSpraying: false,
                            chemicalFertilizer: false,
                        }
                    },
                },
                ...locinitialValues
            },
            fields,
            template,
            ...rest
        }
    },
)


const ConnectedCropVariantPage = compose(
    withConnect,
    withForm,
)(FieldProductionMainCropVariants) 

const ConnectedSubsidyPage = compose(
    withConnect,
    withForm,
)(FieldProductionMainCropSubsidies) 

const ConnectedTaskPage = compose(
    withConnect,
    withForm,
)(FieldProductionTasks) 


const ProductionCreateForm = ({
    onClose,
    handleConfirm,
    initialValues,
    ...props
}) => {

    const dispatch = useDispatch()
    
    const steps = [
        messages.stepCrop,
        messages.stepSubsidy,
        messages.stepTask,
    ]

    const data = [
        {},
        {},
        {},
        {},
    ]

    const closeDestroy = () => {
        dispatch(destroy(PRODUCTION_FORM_NAME))
        onClose && onClose()
    }

    const handleSubmit = (data) => {
        dispatch(destroy(PRODUCTION_FORM_NAME))
        handleConfirm(data)
    }

    const contents = [
        ({handleComplete, onBack, ...props}) => 
            <ConnectedCropVariantPage 
                onSubmit={handleComplete}
                onBack={closeDestroy}
                data={data}
                initialValues={initialValues}
                footer={
                    <StepperFooter
                        title={globalMessages.next}
                    />
                }
                {...props}
            />,
        ({handleComplete, handleBack, ...props}) => 
            <ConnectedSubsidyPage 
                onSubmit={handleComplete}
                onBack={handleBack}
                data={data}
                initialValues={initialValues}
                footer={
                    <StepperFooter
                        title={globalMessages.next}
                    />
                }
                {...props} 
            />,
        ({handleBack, ...props}) => 
            <ConnectedTaskPage 
                onSubmit={handleSubmit}
                onBack={handleBack}
                initialValues={initialValues}
                footer={
                    <StepperFooter
                        title={globalMessages.save}
                    />
                }
                {...props}
            />,
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
                    <StepperContent>
                        {({activeStep, ...props}) =>  contents[activeStep](props)}
                    </StepperContent>
                </Container>
            </Stepper>
        </Flex>        
    )
}
/*
<FlexStepper 
    //defaultStep={1} // TODO: REmove
    steps={steps}
    contents={contents}
    defaultStep={0}
    stepperContainer={HeaderStepper}
    containerComponent={StepperContainer}
/>
*/

ProductionCreateForm.propTypes = {

}

export default ProductionCreateForm
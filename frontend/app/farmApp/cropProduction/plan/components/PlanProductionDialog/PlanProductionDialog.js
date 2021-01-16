import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import {useCallbackRef} from 'use-callback-ref';
import { useDispatch } from 'react-redux'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, destroy } from 'redux-form'

import { Modal } from 'site/components'
import { Stepper } from 'components'
import { DetailHeader, DetailContainer, DetailFooter } from 'farmApp/components/Detail'
//import ProductionTabGeneral from './ProductionTabGeneral'

import {
    CropVariantPage,
    SubsidyPage,
    TaskPage,
} from './MainCropProduction'

import { PLAN_PRODUCTION_FORM_NAME } from '../../constants'

const Container = styled.div`
    flex-grow: 1;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const FlexStepper = styled(props => <Stepper {...props} />)`
    display: flex;
    height: 100%;
    flex-direction: column;
`

const StepperContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`


const withForm = reduxForm({
    form: PLAN_PRODUCTION_FORM_NAME,
    //validate,
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
})

const formSelector = formValueSelector(PLAN_PRODUCTION_FORM_NAME)

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        console.debug("locinitialValues: ", locinitialValues)

        const { parcels, template } = formSelector(state, 'parcels', 'template')
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
            parcels,
            template,
            ...rest
        }
    },
)


const ConnectedCropVariantPage = compose(
    withConnect,
    withForm,
)(CropVariantPage) 

const ConnectedSubsidyPage = compose(
    withConnect,
    withForm,
)(SubsidyPage) 

const ConnectedTaskPage = compose(
    withConnect,
    withForm,
)(TaskPage) 


const PlanProductionDialog = ({
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
        dispatch(destroy(PLAN_PRODUCTION_FORM_NAME))
        onClose && onClose()
    }

    const handleSubmit = (data) => {
        dispatch(destroy(PLAN_PRODUCTION_FORM_NAME))
        handleConfirm(data)
    }

    const contents = [
        ({onComplete, onBack, ...props}) => 
            <ConnectedCropVariantPage 
                onSubmit={onComplete}
                onBack={closeDestroy}
                data={data}
                initialValues={initialValues}
                {...props}
            />,
        ({onComplete, onBack, ...props}) => 
            <ConnectedSubsidyPage 
                onSubmit={onComplete}
                onBack={onBack}
                data={data}
                initialValues={initialValues}
                {...props} 
            />,
        ({onBack, ...props}) => 
            <ConnectedTaskPage 
                onSubmit={handleSubmit}
                onBack={onBack}
                initialValues={initialValues}
                {...props}
            />,
    ]


    return (
        <Flex>          
            <DetailHeader
                title={messages.title}
                onClose={closeDestroy}
            >                        
            </DetailHeader>
                <Container /*ref={ ref => setContainerRef(ref)}*/>
                    <FlexStepper 
                        //defaultStep={1} // TODO: REmove
                        steps={steps}
                        contents={contents}
                        defaultStep={0}
                        containerComponent={StepperContainer}
                    />
                </Container>

        </Flex>        
    )
}
/*
            <DetailFooter
                onClose={onClose}
            />
*/

PlanProductionDialog.propTypes = {

}

export default PlanProductionDialog
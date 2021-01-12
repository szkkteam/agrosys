import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import {useCallbackRef} from 'use-callback-ref';

import { Modal } from 'site/components'
import { Stepper } from 'components'
import { DetailHeader, DetailContainer, DetailFooter } from 'farmApp/components/Detail'
//import ProductionTabGeneral from './ProductionTabGeneral'

import {
    CropVariantPage,
    SubsidyPage,
    TaskPage,
} from './MainCropProduction'


const Tab1 = () => <div>content</div>
const Tab2 = () => <div>content 2</div>

const Container = styled.div`
    padding: 10px 15px;
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
`

const PlanProductionDialog = ({
    onClose,
    ...props
}) => {
    //console.debug("headerProps: ", headerProps)
    //const [containerRef, setContainerRef] = useState(null)
    //const [,forceUpdate] = useState();
    /*
    const containerRef = useCallbackRef(null, () => forceUpdate())
    console.debug("Props: ", props)
    */
    /**
     * TODO: 
     * Keep the stepper in this component, and manage the form steps here.
     * Based on the input value (main crop/secondary) give the stepper the corresponding content
     */
    /*
    const portalContainer = useMemo(() => {
        return ({children, ...props}) => (
            <Portal container={containerRef.current}>
                {children}
            </Portal>
        )
    }, [containerRef])
    */
   /*
   const portalContainer = useMemo(() => {
       return ({children, ...props}) => {
           console.debug("New portal compp rops: ", containerRef)
           return (
            <Portal container={containerRef?.current}>
                {children}
            </Portal>
           )
       }
   }, [containerRef])
   */

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

    const contents = [
        (props) => <CropVariantPage {...props} data={data}/>,
        (props) => <SubsidyPage {...props} data={data}/>,
        (props) => <TaskPage {...props} data={data}/>,
    ]
   
    return (
        <Flex>          
            <DetailHeader
                title={messages.title}
                onClose={onClose}
            >                
            </DetailHeader>
                <Container /*ref={ ref => setContainerRef(ref)}*/>
                    <FlexStepper 
                        //defaultStep={1} // TODO: REmove
                        steps={steps}
                        contents={contents}
                        defaultStep={2}
                        containerComponent={StepperContainer}
                    />
                </Container>
            <DetailFooter
                onClose={onClose}
            />
        </Flex>        
    )
}

PlanProductionDialog.propTypes = {

}

export default PlanProductionDialog
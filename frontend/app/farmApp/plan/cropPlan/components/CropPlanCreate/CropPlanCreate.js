import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    PageHeader,
    PageContent,
    Stepper,
    StepperHeader,
    PageToolbar,
    PrimaryActionButton,
    PrimaryButton
} from 'components'

import {
    WizzardForm
} from 'components/Form'

import {
    Paper
} from '@material-ui/core'

import StepperBack from './StepperBack'
import CropPage from './CropPage'

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    padding: 0;
    padding-top: 35px;
    position: relative;
`

const StepperHeaderContainer = styled(Paper)`
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

const CropPlanCreate = ({
    season
}) => {

    const initialValues = {
        season,
        ...CropPage.initialValues,
    }

    const steps = [
        messages.stepCrop,
        messages.stepTask,
    ]


    const handleSubmit = (d) => {
        console.debug("Submitting ... : ", d)
        handleConfirm && handleConfirm(d)
    }

    return (
        <PageContent spacing={[1, 2]}>
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
                       <CropPage validationSchema={CropPage.schema}>First page</CropPage>
                       <div validationSchema={()=>null}>Second page</div>
                    </FlexWizzard>
                </Container>
            </Stepper>
        </PageContent>
    )
}

CropPlanCreate.propTypes = {

}

export default CropPlanCreate
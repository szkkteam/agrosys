import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system';

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
    Paper,
    Grid
} from '@material-ui/core'

import StepperBack from './StepperBack'
import CropPage from './CropPage'
import TemplatePage from './TemplatePage'

const Container = styled.div`
    ${spacing}
`

const StepperHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
`

const MediumStepperHeader = styled(props => <StepperHeader {...props} />)`
    width: 70%;
    margin: 0 auto;
    background-color: initial;
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
        ...TemplatePage.initialValues,
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
        <Stepper
            steps={steps}
            //contents={contents}
            //defaultStep={1}
        >
            <Paper>
                <Grid container>
                    <Grid item xs={3}>
                        <StepperHeader 
                            orientation="vertical"
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <Container
                            p={3}
                        >
                            <FlexWizzard
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >                        
                                <CropPage validationSchema={CropPage.schema} />
                                <TemplatePage validationSchema={TemplatePage.schema} />
                            </FlexWizzard>
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
            
        </Stepper>
    )
}
/*
<StepperHeaderContainer>
                <StepperBack />
                
            </StepperHeaderContainer>
            
            <Container >
                
            </Container>
*/

CropPlanCreate.propTypes = {

}

export default CropPlanCreate
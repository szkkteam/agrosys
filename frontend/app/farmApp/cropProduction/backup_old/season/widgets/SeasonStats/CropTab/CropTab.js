import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { PrimaryActionButton } from 'components'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import {
    MobileStepper,
    Button,
    Grid,
    Typography,
    
} from '@material-ui/core'

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
`

const Stepper = styled(MobileStepper)`
    width: 100%;
`

const Grow = styled.div`
    flex-grow: 1;
`

const Content = ({

}) => {
    return (
        <Grid container >
            <Grid container item xs={12} alignItems="center">  
                <div>
                    <Typography variant="body1">
                        Main crop production
                    </Typography>
                    <Typography variant="caption">
                        (Szeptember 1 - November 1)
                    </Typography>
                </div>     
                <Grow />
                <PrimaryActionButton
                    title="Add production"
                />
            </Grid>
            <Grid container item xs={12}>

            </Grid>
        </Grid>
    )
}

const CropTab = ({

}) => {
    const steps = 2
    const [activeStep, setActiveStep] = useState(0)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    };

    return (
        <Container>
            <Grow>
                <Content />
            </Grow>
            <Stepper
                variant="dots"
                steps={steps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === steps - 1}
                    >
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button 
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </Container>
    )
}

CropTab.propTypes = {

}

export default CropTab
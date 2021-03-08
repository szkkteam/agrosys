import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system';

import {
    Stepper,
    StepperHeader,
} from 'components'

import {
    WizzardForm
} from 'components/Form'

import {
    Paper,
    Grid
} from '@material-ui/core'

import StepperPage from './StepperPage'

const Container = styled.div`
    ${spacing}
`


const FlexWizzard = styled(WizzardForm)`
    flex-grow: 1;
`

const StepperFormLayout = ({
    initialValues,
    steps,
    handleSubmit,
    children,
    ...props
}) => {


 
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
                                {children}
                            </FlexWizzard>
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
            
        </Stepper>
    )
}

StepperFormLayout.propTypes = {

}

StepperFormLayout.Page = StepperPage

export default StepperFormLayout
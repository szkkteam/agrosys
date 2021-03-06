import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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

import FieldPage from './FieldPage'
import SubsidyPage from './SubsidyPage'

const Container = styled.div`
    ${spacing}
`


const FlexWizzard = styled(WizzardForm)`
    flex-grow: 1;
`

const FieldPlanCreate = ({
    season
}) => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('md'));

    const initialValues = {
        season,
        fields: [],
        ...FieldPage.initialValues,
        ...SubsidyPage.initialValues,
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
                    <Grid item xs={12} md={2} lg={2} xl={1}>
                        <StepperHeader 
                            orientation={isLarge? "vertical" : "horizontal"}
                        />
                    </Grid>
                    <Grid item xs={12} md={10} lg={10} xl={11}>
                        <Container
                            p={3}
                        >
                            <FlexWizzard
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >                        
                                <FieldPage validationSchema={FieldPage.schema} />
                                <SubsidyPage validationSchema={SubsidyPage.schema} />
                            </FlexWizzard>
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
            
        </Stepper>
    )
}
/*

                                <TemplatePage validationSchema={TemplatePage.schema} />
*/

FieldPlanCreate.propTypes = {

}

export default FieldPlanCreate
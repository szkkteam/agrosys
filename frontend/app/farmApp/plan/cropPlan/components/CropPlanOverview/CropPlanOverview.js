import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from './messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'

import {
    PrimaryActionButton,
} from 'components'
import { 
    ExpandPanelGroup,
} from 'farmApp/components'

import {
    Grid,
    Paper,
    List,
} from '@material-ui/core'

import CropPlanCrop from '../CropPlanCrop/CropPlanCrop'
import CropPlanTaskList from '../CropPlanTaskList/CropPlanTaskList'


const LinkButton = withLinkComponent(PrimaryActionButton)

const ButtonPadding = styled.div`
    padding-bottom: 25px;
`

const CropPlanOverview = ({
    season,
}) => {

    return (          
        <Grid container spacing={3} style={{flexGrow: 1}}>
            <Grid item xs={12} sm={6} md={8}>
                <ButtonPadding>
                    <LinkButton
                        title={messages.addCropPlan}
                        to={ROUTES.PlanCropPlanCreate}
                        params={{season}}
                        //onClick={createGrowSeason}
                    />
                </ButtonPadding>
                <ExpandPanelGroup>
                    <CropPlanCrop />
                    <CropPlanCrop />
                    <CropPlanCrop />
                </ExpandPanelGroup>
            </Grid>
            <Grid container item xs={12} sm={6} md={4} direction="column">
                <ButtonPadding>
                    <PrimaryActionButton
                        title={messages.addTaskPlan}
                        //onClick={createGrowSeason}
                    />
                </ButtonPadding>
                <CropPlanTaskList />
            </Grid>
        </Grid>
    )
}

CropPlanOverview.propTypes = {

}

export default CropPlanOverview
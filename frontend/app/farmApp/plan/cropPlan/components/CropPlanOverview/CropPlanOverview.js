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
    PageHeader,
    PageContent,
    PageToolbar,
    PrimaryActionButton,
    PrimaryButton
} from 'components'
import { 
    PanelContainer,
    SeasonArrowSelector
} from 'farmApp/components'

import {
    Grid,
    Paper,
    List,
} from '@material-ui/core'

import CropPlanCrop from '../CropPlanCrop/CropPlanCrop'
import CropPlanTaskList from '../CropPlanTaskList/CropPlanTaskList'


const LinkButton = withLinkComponent(PrimaryActionButton)

const Spacer = styled.div`
    flex-grow: 1;
`

const ButtonPadding = styled.div`
    padding-bottom: 25px;
`

const CropPlanOverview = ({
    season,
}) => {

    const location = useLocation()
    const history = useHistory()

    const handleSeasonChange = (newSeason) => {
        history.push({
            path: location.pathname,
            search: `season=${newSeason}`
        })
    }

    return (
        <PageContent spacing={[1, 2]}>
            <PageHeader
                spacing={[3,2]}
                title={messages.title}
                subheader={messages.subheader}
            >        
                <Spacer />
                <SeasonArrowSelector
                    season={season}
                    onChange={handleSeasonChange}
                />
            </PageHeader>  
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
                    <PanelContainer>
                        <CropPlanCrop />
                        <CropPlanCrop />
                        <CropPlanCrop />
                    </PanelContainer>
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
        </PageContent>
    )
}

CropPlanOverview.propTypes = {

}

export default CropPlanOverview
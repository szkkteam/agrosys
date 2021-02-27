import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
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
import { PanelContainer } from 'farmApp/components'

import {
    Grid
} from '@material-ui/core'

import CropPlanCrop from '../CropPlanCrop/CropPlanCrop'
import CropPlanTaskContainer from '../CropPlanTaskContainer/CropPlanTaskContainer'

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
    return (
        <PageContent spacing={[1, 2]} overflow>
            <PageHeader
                spacing={[3,2]}
                title={messages.title}
                subheader={messages.subheader}
            >        
                <Spacer />
                <div>
                    {season}
                </div>
            </PageHeader>  
            <Grid container spacing={3}>
                <Grid item xs={8}>
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
                <Grid item xs={4}>
                    <ButtonPadding>
                        <PrimaryActionButton
                            title={messages.addTaskPlan}
                            //onClick={createGrowSeason}
                        />
                    </ButtonPadding>
                    <CropPlanTaskContainer>

                    </CropPlanTaskContainer>
                </Grid>
            </Grid>
        </PageContent>
    )
}

CropPlanOverview.propTypes = {

}

export default CropPlanOverview
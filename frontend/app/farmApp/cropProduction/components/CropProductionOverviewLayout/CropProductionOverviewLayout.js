import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import CropProductionOverviewToolbar from '../CropProductionOverviewToolbar/CropProductionOverviewToolbar'

import {
    UpcomingTask
} from 'farmApp/cropProduction/task/widgets'

import {
    CropExpense,
    CropIncome,
    CropROI,
    CultivatedArea
} from 'farmApp/cropProduction/widgets'

import {
    Grid,
    Typography,
} from '@material-ui/core'

const Container = styled.div`
    ${({theme, spacing}) => `
        flex-grow: 1;
        padding: 7px 8px;
        ${theme.breakpoints.up('sm')} {
            padding: 15px calc(${theme.spacing(spacing)}px / 2 + 1px);
        }
    `}
`


/*
const CollapseAbleSection = ({
    title,
    children,

}) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}
*/

const CropProductionOverviewLayout = ({

}) => {

    return (
        <Container
            spacing={4}
        >
            <Grid 
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Crops dashboard
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CropProductionOverviewToolbar />
                </Grid>
                <Grid
                    alignItems="stretch"
                    container
                    item xs={12}
                    spacing={2}
                >   
                    <Grid item xs={12} sm={6} md={3}>
                        <CultivatedArea />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <CropIncome />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <CropExpense />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <CropROI />
                    </Grid>
                </Grid>
                <Grid 
                    container item xs={12} 
                    spacing={2}
                >
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <UpcomingTask />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
/*
content<br/>
            1) Page title, enough whitespaces.<br/>
                              2) Filter toolbar. Crop chips, select all, edit crops button, add crop button<br/>
                              3) A row (maybe carousel) to display common KPIs<br/>
                              4) Grid layout, to put widgets inside. Based on filtered crops<br/>
                              4.1) Tasks, crop growth, weather, ROI, yield, crop finance, usages, etc...
*/

CropProductionOverviewLayout.propTypes = {

}

export default CropProductionOverviewLayout

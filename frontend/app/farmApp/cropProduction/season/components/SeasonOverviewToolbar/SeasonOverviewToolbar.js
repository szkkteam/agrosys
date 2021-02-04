import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useParams, Switch } from "react-router-dom";
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'

import { 
    Toolbar,
} from 'farmApp/components'

import {
    Grid,
    Typography,
    Chip,
    Avatar,
    Button,
    Paper,
} from '@material-ui/core'

const ButtonChip = styled(Chip)`
    margin: 3px 4px;
`
const LinkChip = styled(withLinkComponent(Chip))`
    margin: 3px 6px;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const LowerCase = styled(Button)`
    text-transform: initial;
`


const SeasonOverviewToolbar = ({

}) => {

    const params = useParams()

    const handleClick = () => {

    }

    return (
        <Toolbar sticky>
            <Grid container>
                <Grid container item xs={12} /*justify="space-evenly" */>
                    <LinkChip
                        to={ROUTES.CropProductionSeasonView}
                        params={params}
                        label="Seasons"
                        onClick={handleClick}
                    />
                    <LinkChip
                        to={ROUTES.CropProductionTaskView}
                        params={params}
                        label="Tasks"
                        onClick={handleClick}
                    />
                    <LinkChip
                        to={ROUTES.CropProductionFieldProductionView}
                        params={params}
                        label="Fields"
                        onClick={handleClick}
                    />
                    <ButtonChip
                        label="Weather"
                        onClick={handleClick}
                    />
                    <ButtonChip
                        label="Analysis"
                        onClick={handleClick}
                    />
                </Grid>
                
            </Grid>
        </Toolbar>
    )
}
/*
<Grid container item xs={12} md={2}>
                    Settings + timeline
                </Grid>
*/

SeasonOverviewToolbar.propTypes = {

}

export default SeasonOverviewToolbar

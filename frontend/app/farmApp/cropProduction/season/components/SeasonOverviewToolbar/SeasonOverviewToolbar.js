import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useParams, Switch } from "react-router-dom";
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'

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
    disabled=false,
}) => {

    const params = useParams()

    const handleClick = () => {

    }

    const ChipButton = !disabled? LinkChip : ButtonChip
    const chipProps = !disabled? {params} : {disabled: true}

    console.debug("ChipButton: ", ChipButton)

    return (
        <Grid container>
            <Grid container item xs={12} /*justify="space-evenly" */>
                <ChipButton
                    to={ROUTES.CropProductionSeasonView}
                    {...chipProps}
                    label="Seasons"
                    onClick={handleClick}
                />
                <ChipButton
                    to={ROUTES.CropProductionTaskView}
                    {...chipProps}
                    label="Tasks"
                    onClick={handleClick}
                />
                <ChipButton
                    to={ROUTES.CropProductionFieldProductionView}
                    {...chipProps}
                    label="Fields"
                    onClick={handleClick}
                />
                <ChipButton
                    {...chipProps}
                    label="Weather"
                    onClick={handleClick}
                />
                <ChipButton
                    {...chipProps}
                    label="Analysis"
                    onClick={handleClick}
                />
            </Grid>
            
        </Grid>
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

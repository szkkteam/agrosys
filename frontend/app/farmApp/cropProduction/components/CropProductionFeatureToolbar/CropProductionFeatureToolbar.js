import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useParams, Switch } from "react-router-dom";
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'

import EventNoteIcon from '@material-ui/icons/EventNote';
import MapIcon from '@material-ui/icons/Map';

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

const CropProductionFeatureToolbar = ({
    disabled=false,
    children
}) => {

    const params = useParams()

    const handleClick = () => {

    }

    const ChipButton = !disabled? LinkChip : ButtonChip
    const chipProps = !disabled? {params} : {disabled: true}

    console.debug("ChipButton: ", ChipButton)

    return (
        <Grid container>
            <Grid container item xs={12} md={10}/*justify="space-evenly" */>
                <ChipButton
                    icon={<EventNoteIcon />}
                    to={ROUTES.CropProductionTaskView}
                    {...chipProps}
                    label="Tasks"
                    onClick={handleClick}
                />
                <ChipButton
                    icon={<MapIcon />}
                    to={ROUTES.CropProductionFieldProductionView}
                    {...chipProps}
                    label="Fields"
                    onClick={handleClick}
                />
                <ButtonChip
                    disabled
                    label="Weather"
                    onClick={handleClick}
                />
                <ButtonChip
                    disabled
                    label="Analysis"
                    onClick={handleClick}
                />
            </Grid>
            {children}            
        </Grid>
    )
}
/*
<Grid container item xs={12} md={2}>
                    Settings + timeline
                </Grid>
*/

CropProductionFeatureToolbar.propTypes = {

}

export default CropProductionFeatureToolbar

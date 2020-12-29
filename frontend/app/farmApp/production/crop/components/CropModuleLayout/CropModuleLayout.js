import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { withLinkComponent } from 'utils/hoc'
import { ROUTES } from 'routes'

import {
    CropCard,
} from '../../components'

import {
    Grid,
} from '@material-ui/core'

const GridContainer = styled.div`
    padding: 10px 20px;
    overflow-y: auto;
    max-height: 750px; // TODO: Be carefull, this is a fixed value
`


const StyledGrid = styled(Grid)`
    margin-bottom: 30px;
`


const CropModuleLayout = ({

}) => {

    const items = [
        {},
        {},
        {},
        {},
        {},
    ]

    return (
        <GridContainer>
            <StyledGrid
                container
                spacing={2}
            >
                { items && items.map((item, i) => (
                    <Grid item xs={3} key={i}>
                        <CropCard />
                    </Grid>
                ))}


            </StyledGrid>
        </GridContainer>
    )
}

/*
        <div>
        Crop overview. Show quick stats about crops and running productions.<br/>
        Add possibility to create crop, or create production directly under specifc crop or create inline crop for it.<br/>
        Also manage the seasons?<br/>
    </div>
*/

CropModuleLayout.propTypes = {

}

export default CropModuleLayout

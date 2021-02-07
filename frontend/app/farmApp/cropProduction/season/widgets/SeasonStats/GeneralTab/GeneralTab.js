import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { PrimaryActionButton } from 'components'
import { SimpleProgress } from 'farmApp/components'

import {
    Typography,
    Grid
} from '@material-ui/core'

const Grow = styled.div`
    flex-grow: 1;
`

const GeneralTab = ({

}) => {
    return (
        <Grid container alignItems="flex-start" direction="row">
            <Grid container item xs={12} alignItems="center">  
                <div>
                    <Typography variant="body1">
                        Wheat 2020
                    </Typography>
                    <Typography variant="caption">
                        (Szeptember 1 - November 20)
                    </Typography>
                </div>     
                <Grow />
                <PrimaryActionButton
                    title="Add production"
                />
            </Grid>
            <Grid container item xs={12} direction="row">
                <SimpleProgress
                    title="Yield"
                    valueText="5t / 9t"
                    progress={50}
                />
                <Grid item xs={6}>
                   
                    <div>
                        <Typography variant="body2">
                            Area: 35 ha
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body2">
                            Crop: Őszi búza
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body2">
                            Variants: Variant1, variant2
                        </Typography>
                    </div>
                </Grid>
                <Grid  item xs={6}>

                </Grid>
            </Grid>
        </Grid>

    )
}

GeneralTab.propTypes = {

}

export default GeneralTab
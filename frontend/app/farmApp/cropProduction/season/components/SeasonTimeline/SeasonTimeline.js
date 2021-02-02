import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core'

import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector
} from '@material-ui/lab';

const Container = styled.div`
    ${({theme, spacing}) => `
        flex-grow: 1;
        padding: 7px 8px;
        ${theme.breakpoints.up('sm')} {
            padding: 15px calc(${theme.spacing(spacing)}px / 2 + 1px);
        }
    `}
`
const Flex = styled.div`
    display: flex;
`

const FullHeightPaper = styled(Paper)`
    flex-grow: 1;
    padding: 10px 5px;
`

const SeasonTimeline = ({

}) => {
    return (
        <Flex>
            <FullHeightPaper>
                <Grid
                    container
                >
                    <Grid xs={12}>
                        <Typography variant="body2">
                            Seasons
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                </Grid>
            </FullHeightPaper>
        </Flex>
    )
}


SeasonTimeline.propTypes = {

}

export default SeasonTimeline
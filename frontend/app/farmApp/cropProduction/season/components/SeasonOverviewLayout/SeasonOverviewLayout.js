import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { DashboardLayout } from 'farmApp/components'

import SeasonTimeline from '../SeasonTimeline/SeasonTimeline'

import {
    Grid,
} from '@material-ui/core'

const Container = styled.div`
    ${({theme, spacing}) => `
        flex-grow: 1;
        padding: 7px 8px;
        display: flex;
        flex-direction: column;
        ${theme.breakpoints.up('sm')} {
            padding: 15px calc(${theme.spacing(spacing)}px / 2 + 1px);
        }
    `}
`

const TestDiv = styled.div`
    background-color: grey;
`

const SeasonOverviewLayout = ({

}) => {
    return (
        <Container
            spacing={4}
        >
            <Grid
                container
            >
                <Grid item xs={12}>
                    Header + toolbar + current season
                </Grid>
                <Grid 
                    item
                    xs={12}
                >
                    <Grid
                        container
                        direction="row"

                    >
                        <Grid item xs={8}>
                            <DashboardLayout
                                disabled
                                compactType="horizontal"
                                verticalCompact={false}
                            >
                                <TestDiv key="1">1</TestDiv>
                                <TestDiv key="2">2</TestDiv>
                                <TestDiv key="3">3</TestDiv>
                            </DashboardLayout>
                        </Grid>
                        <Grid item xs={4}>
                            <SeasonTimeline />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}


SeasonOverviewLayout.propTypes = {

}

export default SeasonOverviewLayout
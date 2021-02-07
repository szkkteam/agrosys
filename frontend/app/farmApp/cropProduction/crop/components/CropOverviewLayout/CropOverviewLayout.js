import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { PrimaryActionButton } from 'components'

import { 
    DashboardLayout
} from 'farmApp/components'

import {    
    Grid,
    CardMedia,
    Typography
} from '@material-ui/core'

import { SeasonOverviewToolbar } from 'farmApp/cropProduction/season/components'
import { useSeasonCreateDialog } from 'farmApp/cropProduction/season/hooks'

const Media = styled(({width, height, ...props}) => <CardMedia {...props} />)`
    ${({theme, width, height}) => `
        margin: 0 auto;
        width: ${width}px;
        height: ${height}px;
    `}
`

const Text = styled.div`
    margin-top: 15px;
    margin-bottom: 30px;
`

const CenterButton = styled(PrimaryActionButton)`
    margin: 0 auto;
`

const Container = styled.div`
    margin-top: 50px;
    max-width: 400px;
    text-align: center;
`

const CropOverviewLayout = ({

}) => {
    const openDialog = useSeasonCreateDialog()

    const handleCreate = () => {
        openDialog()
    }

    return (
        <DashboardLayout
            headerProps={{
                title: "My corn",
                subheader: "No season created yet"
            }}
            toolbar={
                <SeasonOverviewToolbar
                    disabled
                />
            }
        >
            <Grid container alignItems="flex-start" justify="center" style={{flexGrow: 1}}>
                <Grid item>
                    <Container>
                        <Media
                            width={200}
                            height={120}
                            image="https://via.placeholder.com/200x120"
                        />
                        <Text>
                            <Typography variant="h6">
                                You don't have any seasons yet. Click below to define what you are growing.
                            </Typography>
                        </Text>
                        <PrimaryActionButton                            
                            title="Create season"
                            onClick={handleCreate}
                        />
                    </Container>
                </Grid>
            </Grid>
        </DashboardLayout>        
    )
}


CropOverviewLayout.propTypes = {

}

export default CropOverviewLayout
import React, { useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import globalMessages from 'messages'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { PrimaryActionButton } from 'components'

import {    
    Grid,
    CardMedia,
    Typography
} from '@material-ui/core'

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

const Container = styled.div`
    margin-top: 50px;
    max-width: 400px;
    text-align: center;
`

const EmptyGrowSeason = ({
    onCreate
}) => {

    return (
    
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
                            You don't have any growing seasons defined yet. Click below to define what you are growing.
                        </Typography>
                    </Text>
                    <PrimaryActionButton                            
                        title="Create growing season"
                        onClick={onCreate}
                    />
                </Container>
            </Grid>
        </Grid>
    )
}


EmptyGrowSeason.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default EmptyGrowSeason
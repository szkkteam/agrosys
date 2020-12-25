import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
    Grid,
    Typography,
    Paper,
    Button,
    ButtonGroup
} from '@material-ui/core';

const CardContainer = styled(Paper)`
    border-top: 2px solid green;
    padding: 15px;
    width: 100%;
    background-color: #fff;
`

const HalfButton = styled(Button)`
    width: 50%;
`

const GroupContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
        width: 80%;
        corner-radius: 10px;
    }
`

const TaskSmallCard = ({
    ...props
}) => {
    return (
        <CardContainer
            {...props}
        >
            <Typography variant="h6">
                Harvesting
            </Typography>
            <Typography variant="body2">
                Random title
            </Typography>
            <Typography variant="body2">
                22 sep 2020 - 23 nov 2020
            </Typography>
            <GroupContainer>
                <ButtonGroup
                    variant="outlined"
                    color="primary"
                >
                    <HalfButton
                    >
                        Complete
                    </HalfButton>
                    <HalfButton
                    >
                        On-Plan
                    </HalfButton>
                </ButtonGroup>
            </GroupContainer>
        </CardContainer>
    )
}


TaskSmallCard.propTypes = {
    disabled: PropTypes.bool,

}

export default TaskSmallCard
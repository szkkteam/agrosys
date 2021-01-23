import React, { useState  } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import { withLinkComponent } from 'utils/hoc'

import {
    Typography,
    Grid,
    Button
} from '@material-ui/core';

const LinkButton = withLinkComponent(Button)

const StyledButton = styled(props => <LinkButton {...props} />)`
    width: 200px;
    text-transform: initial;
    justify-content: left;
`

const Description = styled.div`
    margin-top: 10px;
`

const FieldCreateOption = ({
    to,
    title,
    description,
    ...props
}) => {
    return (
        <Grid item xs={12}>
            <div>
                <StyledButton
                    variant="contained"
                    color="primary"
                    to={to}
                >
                    <FormattedMessage {...title} />
                </StyledButton>
                <Description>
                    <Typography variant="body1">
                        <FormattedMessage {...description} />
                    </Typography> 
                </Description>
            </div>
        </Grid>
    )
}


FieldCreateOption.propTypes = {
    title: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired,
    description: PropTypes.object.isRequired
}

export default FieldCreateOption

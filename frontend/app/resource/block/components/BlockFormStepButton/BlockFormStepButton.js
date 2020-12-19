import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { SubmitButton } from 'components/Button'

const Container = styled.div`
    position: absolute;
    bottom: 30px;
    //left: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 250px;
    //margin: auto;
    background-color: black;
    padding: 15px 20px;
    border-radius: 15px; 
    z-index: 1000;
    
    >div {
        margin: 0 auto;

        .Mui-disabled {
            background-color: rgba(255, 255, 255, 0.86);
        }

        button: {
            width: 100%;
        }
    }
`

const BlockFormStepButton = styled(props => 
    <Container>
        <SubmitButton
            {...props}
        />  
    </Container>)`
    width: 100%;
`

export default BlockFormStepButton
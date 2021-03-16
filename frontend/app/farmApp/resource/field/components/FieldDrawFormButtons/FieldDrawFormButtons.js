import React, { useState, useEffect, useMemo, useCallback } from 'react'
import messages from './messages'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import {
    Typography,
    Grid
} from '@material-ui/core'

import { PrimaryButton, SecondaryButton } from 'components'
import { FormattedMessage } from 'react-intl';

const Container = styled.div`
    position: absolute;
    z-index: 3;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: black;
    border-radius: 10px;
    padding: 7px 10px;
    display: flex;   
    align-items: center; 
`

const SummaryContainer = styled.div`
    color: white;
    padding: 0 10px;
`

const Flex = styled.div`
    display: flex;
    flex-wrap: nowrap;
`

const FieldDrawFormButtons = ({
    disabled=false,
    onCancel,
    onSubmit,
}) => {

    return (
        <Container>
            <SummaryContainer>
                <Typography variant="body2">
                    <FormattedMessage 
                        {...messages.fieldCount}
                        values={{
                            fieldCount: 3
                        }}
                    />
                </Typography>
                <Typography variant="h6">
                    34 ha
                </Typography>
            </SummaryContainer>
            <div>
                <SecondaryButton 
                    onClick={onCancel}
                    style={{paddingTop: "9px", paddingBottom: "9px"}}
                />
                <PrimaryButton 
                    disabled={disabled}
                    onClick={onSubmit}
                    style={{paddingTop: "9px", paddingBottom: "9px"}}
                />
            </div>
        </Container>
    )
}

FieldDrawFormButtons.propTypes = {

}

export default FieldDrawFormButtons
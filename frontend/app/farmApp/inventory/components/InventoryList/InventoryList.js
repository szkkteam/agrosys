import React, { useContext, useMemo, useState, forwardRef, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'


import {
    List,
    ListSubheader,
    Typography,
} from '@material-ui/core';

import {
    InventoryItem
} from '../../components'

const Container = styled.div`
    height: 100%;
    padding: 20px 5px;
`

const ListTitle = styled(Typography)`
    padding-bottom: 20px;
    border-bottom: 2px solid black;
`

const StyledList = styled(List)`
    padding-top: 20px;
`


const InventoryList = ({

}) => {
    return (
        <Container>
            <ListTitle variant="h5">
                Warehouse / Bins
            </ListTitle>
            <StyledList
                component="ul"
            >
                <InventoryItem title="Warehouse 1">
                    <InventoryItem title="Bin 1"/>    
                    <InventoryItem title="Bin 2"/>
                </InventoryItem>
                <InventoryItem title="Warehouse 2"/>
                <InventoryItem title="Warehouse 3"/>
            </StyledList>
        </Container>
    )
}

InventoryList.propTypes = {

}

export default InventoryList
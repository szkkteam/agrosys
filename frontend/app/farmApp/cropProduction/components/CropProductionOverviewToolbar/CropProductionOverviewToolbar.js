import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";

import { 
    PrimaryActionButton,
    DataLoading,
} from 'components'

import {
    Grid,
    Chip,
    Avatar,
    Button,
} from '@material-ui/core'

const CropChip = styled(Chip)`
    margin: 3px 4px;
`
const Spacer = styled.div`
    flex-grow: 1;
`

const LowerCase = styled(Button)`
    text-transform: initial;
`

const CropFilterContainer = ({
    data,
    selected,
    onClick
}) => {
    return (
        data.map(({id, title}, i) => (
            <CropChip 
                key={i}
                color={id in selected? "primary" : "default"}
                avatar={<Avatar alt={title}>{title.charAt(0)}</Avatar> }
                label={title}
                onClick={onClick(id)}
            />
        ))
    )
}

const CropFilter = ({}) => {
    const [selected, setSelected] = useState({})

    const { payload, isLoading } = {payload: [], isLoading: true}
    //const { payload = [], isLoading = false } = {}

    // TODO: Store selected crops in redux store.
    const handleSelectAll = () => {
        if (Array.isArray(payload)) {
            const ids = payload.map(x => x.id)
            let { ...newSelected } = selected
            ids.forEach(x => {
                newSelected[x] = true
            })
            setSelected(newSelected)
        }
    }

    const handleClick = (i) => () => {
        let { ...newSelected } = selected
        if (i in selected) {
            delete newSelected[i]
        } else {
            newSelected[i] = true
        }
        setSelected(newSelected)
    }

    const handleCreate = () => {
    }

    return (
        <>
            {!isLoading? (
                <CropFilterContainer
                    data={payload}
                    selected={selected}
                    onClick={handleClick}
                />  
            ) : (
                <DataLoading />
            )}
            <LowerCase
                color="primary"
                onClick={handleSelectAll}
            >
                select all
            </LowerCase>
            <Spacer />
            <PrimaryActionButton
                onClick={handleCreate}
                title={messages.addNewTitle}
            />
        </>
    )
}

const CropProductionOverviewToolbar = ({

}) => {

    return (
        <Grid container>
            <Grid container item xs={12} md={10}>
                <CropFilter />
            </Grid>
            
        </Grid>
    )
}
/*
<Grid container item xs={12} md={2}>
                    Settings + timeline
                </Grid>
*/

CropProductionOverviewToolbar.propTypes = {

}

export default CropProductionOverviewToolbar

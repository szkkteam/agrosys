import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";

import { 
    PrimaryActionButton,
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

const CropFilter = ({}) => {
    const [selected, setSelected] = useState({})

    const data = [
        {id: 1, title: 'My wheat'},
        {id: 2, title: 'My corn'},
        {id: 3, title: 'My etc'},
    ]

    const handleSelectAll = () => {
        const ids = data.map(x => x.id)
        let { ...newSelected } = selected
        ids.forEach(x => {
            newSelected[x] = true
        })
        setSelected(newSelected)
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

    return (
        <>
            {data.map(({id, title}, i) => (
                <CropChip 
                    key={i}
                    color={id in selected? "primary" : "default"}
                    avatar={<Avatar alt={title}>W</Avatar> }
                    label={title}
                    onClick={handleClick(id)}
                />
            ))}
            <LowerCase
                color="primary"
                onClick={handleSelectAll}
            >
                select all
            </LowerCase>
            <Spacer />
            <PrimaryActionButton
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

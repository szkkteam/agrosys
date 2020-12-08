import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useQuery } from 'utils/hooks'

import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import {
    ToggleButton,
    ToggleButtonGroup
} from '@material-ui/lab';

import { VIEW_MAP, VIEW_LIST, VIEW_MODULE } from '../../constants'

const BlockViewButtons = ({
    history,
    match,
    onChange,
    ...props
}) => {

    const handleChange = (event, newValue) => {
        onChange && onChange(newValue)
        history.replace(`${match.path}?view=${newValue}`)
    }

    const query = useQuery()
    const currentValue = query.get('view') 
    
    useEffect(() => {
        switch(currentValue) {
            case VIEW_MAP:
            case VIEW_LIST:
            case VIEW_MODULE:
                break
            default:
                // TODO: Get the prefered view from storage/redux and apply
                history.replace(`${match.path}?view=${VIEW_MAP}`)
        }
    }, [query])

    return (
        <ToggleButtonGroup
            value={currentValue || VIEW_MAP}
            exclusive
            onChange={handleChange}
            aria-label="block view"
            {...props}
        >
            <ToggleButton value={VIEW_MAP} aria-label="map view">
                <MapIcon />
            </ToggleButton>
            <ToggleButton value={VIEW_LIST} aria-label="list view">
                <ListIcon />
            </ToggleButton>
            <ToggleButton value={VIEW_MODULE} aria-label="module view">
                <ViewModuleIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

BlockViewButtons.propTypes = {
    onChange: PropTypes.func,
}

export default BlockViewButtons
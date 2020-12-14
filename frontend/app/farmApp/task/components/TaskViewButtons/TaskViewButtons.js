import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useQuery } from 'utils/hooks'
import { useLocation, useHistory } from "react-router-dom";

import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import {
    ToggleButton,
    ToggleButtonGroup
} from '@material-ui/lab';

import { VIEW_MAP, VIEW_LIST } from '../../constants'

const TaskViewButtons = ({
    onChange,
    ...props
}) => {

    const history = useHistory()
    const location = useLocation()

    const handleChange = (event, newValue) => {
        onChange && onChange(newValue)
        history.replace({...location, search: `?view=${newValue}`})
    }

    const query = useQuery()
    const currentValue = query.get('view') 
    
    useEffect(() => {
        switch(currentValue) {
            case VIEW_MAP:
            case VIEW_LIST:
                break
            default:
                // TODO: Get the prefered view from storage/redux and apply
                history.replace({...location, search: `?view=${VIEW_MAP}`})
        }
    }, [query])

    return (
        <ToggleButtonGroup
            value={currentValue || VIEW_MAP}
            exclusive
            onChange={handleChange}
            aria-label="task view"
            {...props}
        >
            <ToggleButton value={VIEW_MAP} aria-label="map view">
                <MapIcon />
            </ToggleButton>
            <ToggleButton value={VIEW_LIST} aria-label="list view">
                <ListIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

TaskViewButtons.propTypes = {
    onChange: PropTypes.func,
}

export default TaskViewButtons
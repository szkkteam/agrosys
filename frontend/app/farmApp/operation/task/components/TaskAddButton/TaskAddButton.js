import React, { useRef, useMemo, useLayoutEffect, useEffect, createContext, useContext } from 'react'
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    MenuButton
} from 'components'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
    Button,
    MenuItem
} from '@material-ui/core'

import { TASK_TYPES } from '../../constants'

const MenuContext = createContext({
    handleClick: null
})

const TaskOption = ({
    type,
    ...props
}) => {

    const {
        handleClick
    } = useContext(MenuContext)

    const handleSelect = () => {
        handleClick && handleClick(type)
    }

    return (
        <MenuItem onClick={handleSelect}>
            <FormattedMessage {...globalMessages[type]} />
        </MenuItem>
    )
}

const TaskAddButton = ({
    className,
    onClick,
    ...props
}) => {

    const contextObject = {
        handleClick: onClick
    }

    return (
        <MenuButton
            className={className}
            title={messages.addTask}
            color="primary"
            variant="contained"
            endIcon={
                <ArrowDropDownIcon />
            }            
        >
            <MenuContext.Provider value={contextObject}>
                <TaskOption type={TASK_TYPES.PLANTING}/>
                <TaskOption type={TASK_TYPES.PRODUCT_APPLICATION}/>
                <TaskOption type={TASK_TYPES.TILAGE}/>
                <TaskOption type={TASK_TYPES.SCOUTING}/>
                <TaskOption type={TASK_TYPES.SOIL_SAMPLING}/>
                <TaskOption type={TASK_TYPES.HARVEST}/>
                <TaskOption type={TASK_TYPES.IRRIGATION}/>
                <TaskOption type={TASK_TYPES.OTHER}/>
            </MenuContext.Provider>            
        </MenuButton>
    )
}

TaskAddButton.propTypes = {

}

export default TaskAddButton
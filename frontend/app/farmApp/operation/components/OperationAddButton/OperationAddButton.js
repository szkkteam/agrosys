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

const OperationOption = ({
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

const OperationAddButton = ({
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
            title="New task"
            color="primary"
            variant="contained"
            endIcon={
                <ArrowDropDownIcon />
            }            
        >
            <MenuContext.Provider value={contextObject}>
                <OperationOption type={TASK_TYPES.PLANTING}/>
                <OperationOption type={TASK_TYPES.PRODUCT_APPLICATION}/>
                <OperationOption type={TASK_TYPES.TILAGE}/>
                <OperationOption type={TASK_TYPES.SCOUTING}/>
                <OperationOption type={TASK_TYPES.SOIL_SAMPLING}/>
                <OperationOption type={TASK_TYPES.HARVEST}/>
                <OperationOption type={TASK_TYPES.IRRIGATION}/>
                <OperationOption type={TASK_TYPES.OTHER}/>
            </MenuContext.Provider>            
        </MenuButton>
    )
}

OperationAddButton.propTypes = {

}

export default OperationAddButton
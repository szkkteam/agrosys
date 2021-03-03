import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    MenuButton
} from 'components'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
    Button,
    MenuItem
} from '@material-ui/core'

const TaskButton = styled(MenuButton)`
    width: calc(100% - 2 * 5px);
    margin: 0 5px;
`

const OperationAddButton = ({

}) => {

    return (
        <TaskButton
            title="New task"
            color="primary"
            variant="contained"
            endIcon={
                <ArrowDropDownIcon />
            }            
        >
            <MenuItem>
                Harvest
            </MenuItem>
            <MenuItem>
                Planting
            </MenuItem>
            <MenuItem>
                Other
            </MenuItem>
        </TaskButton>
    )
}

OperationAddButton.propTypes = {

}

export default OperationAddButton
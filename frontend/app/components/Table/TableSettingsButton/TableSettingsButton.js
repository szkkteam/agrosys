import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import {
    List,
    ListItem,
    Checkbox,
    ListItemIcon,
    ListItemText
 } from '@material-ui/core';

import { MenuButton } from 'components'

import './tablesettingsbutton.scss'

const TableSettingsButton = ({
    title,
    Icon,
    onClick,
    children,
    componentProps={},
    ...props
}) => {
    const intl = useIntl()

    return (
        <MenuButton
            className="table-settings-button"
            title={intl.formatMessage(title)}
            componentProps={{
                startIcon: <Icon />,
                endIcon:  <ArrowDropDownIcon />,
                ...componentProps
                //onClick: onClick
            }}
            {...props}
        >            
            {children}
        </MenuButton>
    )
}

TableSettingsButton.propTypes = {
    title: PropTypes.object.isRequired,
    Icon: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default TableSettingsButton
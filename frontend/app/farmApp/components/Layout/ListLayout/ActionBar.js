import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system';
import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'

import { ItemMenu } from 'components'

import {
    Button,
    IconButton,
} from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';


const ActionContainer = styled.div`
    ${spacing}
    display: flex;
    align-items: center;

`

const Spacer = styled.div`
    flex-grow: 1;
`

const ActionSettings = ({
    ...props
}) => {
    return (
        <ItemMenu
            icon={SettingsIcon}
            {...props}
        />
    )
}

const ActionBar = ({
    className,
    settings,
    children,
    ...props
}) => {
  
    return (
        <ActionContainer        
            pb={2}
            className={className}
        >
            {children}
            <Spacer />
            {settings && <ActionSettings
                items={settings}
            />}
        </ActionContainer>
    )
}

ActionBar.propTypes = {
    settings: ItemMenu.propTypes
}

export default ActionBar
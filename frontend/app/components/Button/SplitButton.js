import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
    Grid,
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    Divider,
    Tooltip
} from '@material-ui/core'

const SplitButton = ({
    className,
    options,
    variant="contained",
    disabled = false,
    selectedIndex: defaultSelectedIndex = 0,
    onClick,
    //handleClick,
    placement = 'bottom'
}) => 
{
    const firstEnabledOptionIndex = _.findIndex(options, x => !x.disabled)

    console.debug("firstEnabledOptionIndex: ", firstEnabledOptionIndex)

    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(firstEnabledOptionIndex);
    const anchorRef = React.useRef(null);

    
    const handleClick = () => {
        onClick && onClick(selectedIndex)
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        onClick && onClick(index)
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };


    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    }

    const {
        title: mainTitle,
        disabled: mainDisabled = false,
        onClick: mainOnClick = null,
    } = options[selectedIndex]


    return (
        <div
        className={className}
        >
            <ButtonGroup variant={variant} color="primary" ref={anchorRef} aria-label="split button">
                <Button 
                    onClick={mainOnClick || handleClick}
                    disabled={mainDisabled}
                >
                    <FormattedMessage {...mainTitle}/>
                </Button>                        
                <Button
                    disabled={disabled || options.length == 1 || firstEnabledOptionIndex === -1}
                    color="primary"
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper 
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement={placement}
                transition
                //disablePortal
                
                style={{
                    zIndex: 999
                }}
                
            >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                        {options.map(({title, disabled = false, onClick = null}, index) => (
                            <MenuItem
                                key={index}
                                disabled={disabled}
                                selected={index === selectedIndex}
                                onClick={(event) => {
                                    handleMenuItemClick(event, index)
                                    onClick && onClick(event)
                                }}
                            >
                                <FormattedMessage {...title}/>
                            </MenuItem>
                        ))}
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </div>
    )
}

SplitButton.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.object.isRequired,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    })).isRequired,
    onClick: PropTypes.func,
    selectedIndex: PropTypes.number,
};

export default SplitButton

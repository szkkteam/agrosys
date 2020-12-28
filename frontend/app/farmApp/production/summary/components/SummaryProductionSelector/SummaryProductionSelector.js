import React, { useEffect, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

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
} from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const TopPopper = styled(Popper)`
    z-index: 9999;
`

const FullButtonGroup = styled(ButtonGroup)`
    width: 100%;
`

const FullButton = styled(Button)`
    flex-grow: 1;
`

const options = ['Wheat production (Winter wheat)', 'Wheat prod secondary (Oilseed)'];

const SummaryProductionSelector = ({

}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };
    
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };
    
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
    };

    return (
    <Grid container direction="column" >
        <Grid item xs={12} style={{padding: "0 10px"}}>
            <FullButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                <FullButton onClick={handleClick}>
                    {options[selectedIndex]}
                </FullButton>
                <Button
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
            </FullButtonGroup>
            <TopPopper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
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
                        {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                        ))}
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </TopPopper>
        </Grid>
    </Grid>
    )
}

SummaryProductionSelector.propTypes = {

}

export default SummaryProductionSelector
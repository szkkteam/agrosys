import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';

import Tooltip from '@material-ui/core/Tooltip';

import {
    EllipsisText
} from 'components/Text'

const SplitButton = ({
    options,
    disabled = false,
    selectedIndex: defaultSelectedIndex = 0,
    //handleClick,
    placement = 'bottom'
}) => 
{
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(defaultSelectedIndex);
    const anchorRef = React.useRef(null);

    
    const handleClick = () => {
        console.debug(`You clicked ${options[selectedIndex]}`);
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
    }

    return (
        <div>
            <ButtonGroup variant="outlined" color="primary" ref={anchorRef} aria-label="split button">
                <Button 
                    onClick={handleClick}
                >
                    {options[selectedIndex]}
                </Button>                        
                <Button
                    disabled={disabled || options.length == 1}
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
                disablePortal
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
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                disabled={index === 2}
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
            </Popper>
        </div>
    )
}

SplitButton.propTypes = {
    options: PropTypes.array.isRequired,
};

export default SplitButton

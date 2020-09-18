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
    selectedIndex = 0,
    handleClick,
    }) => 
{
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    /*
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };*/

    const handleMenuItemClick = (event, index) => {
        handleClick && handleClick(event, index)
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
        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                    <Button 
                        disabled={disabled}
                        onClick={(e) => handleClick && handleClick(e, options[selectedIndex])}
                        {...options[selectedIndex].props}
                    >
                        {options[selectedIndex].title}
                    </Button>
                    <Button
                        disabled={disabled}
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
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
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
                            option.type === "item"? 
                            <MenuItem
                                key={`item-${index}`}
                                disabled={option.disabled}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, option)}
                                {...option.props}
                            >
                                {option.title}
                            </MenuItem> :
                                <Divider
                                    key={`divider-${index}`}
                                    style={{ margin: "6px 0" }} 
                                />      
                            ))}
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
            </Grid>
        </Grid>
    )
}

SplitButton.propTypes = {
    options: PropTypes.array.isRequired,
};

export default SplitButton

import React from 'react'
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import './seasonpopover.scss'

export default ({
    label,
    children,
    ...props
}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick  = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose  = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'season-popover' : undefined;
    return (
        <div>
            <ClickAwayListener onClickAway={handleClose}>
                <div>
                <Button
                    aria-describedby={id}
                    variant="text"
                    color="primary"
                    onClick={handleClick}
                >   
                    <div>
                        <DateRangeIcon
                            fontSize="large"
                        />
                        <span className={"selected-season-title"}>
                            {label}
                        </span>
                    </div>
                </Button>
                <Popover 
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {children}
                </Popover>
                </div>
            </ClickAwayListener>
        </div>
    )
} 
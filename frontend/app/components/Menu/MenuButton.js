import React, { useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';

import { Popover } from 'components'


const MenuButton = ({
    children,
    listProps={},
    ...props
}) => {

    const Menu = useMemo(
        () => forwardRef((props, ref) => {
            const {
                open,
                handleListKeyDown,
                onClose,
                children,
                ...rest
            } = props
            return (
                <MenuList
                    ref={ref}
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    {...listProps}
                >
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { 
                                onClose,
                                open,
                            })
                        }
                        return child
                    })} 
                </MenuList>
            )
        })
    )

    return (
        <Popover
            {...props}
        >
            <Menu
                {...listProps}
            >
                {children}
            </Menu>
        </Popover>
    )
}


MenuButton.propTypes = {
    isOpen: PropTypes.bool,
    component: PropTypes.element,
    componentProps: PropTypes.object,
    title: PropTypes.string,
    listProps: PropTypes.object,
    //children: PropTypes.arrayOf(PropTypes.element),
    className: PropTypes.string,
}

export default MenuButton
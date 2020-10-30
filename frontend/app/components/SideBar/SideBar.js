import React from 'react'
import classnames from 'classnames'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import './sidebar.scss'

//<nav className={classnames({ 'menu-open': menuOpen })}>
/*
className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
*/

export default ({
    isDrawerOpen,
    onDrawerClose,
    children,
}) => {

    return (
        <Drawer
            variant="permanent"        
            className={classnames('side-appbar', {
                open: isDrawerOpen,
                close: !isDrawerOpen
            })}
            classes={{
                paper: classnames({
                    open: isDrawerOpen,
                    close: !isDrawerOpen
                })
            }}
        >
        <div className={classnames('toolbar')}>            
            <IconButton onClick={onDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
        {children}
      </Drawer>
    )
}
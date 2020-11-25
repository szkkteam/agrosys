import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';


const Popover = ({
    isOpen=false,
    component=null,
    componentProps=null,    
    title="",
    children,
    className="",
    placement='bottom',
    ...props
}) => {

    const [open, setOpen] = React.useState(isOpen)
    const anchorRef = React.useRef(null)

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }
    
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return
        }    
        setOpen(false)
    }
    
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault()
          setOpen(false)
        }
      }
    
      // return focus to the button when we transitioned from !open -> open
      const prevOpen = React.useRef(open);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus()
        }
    
        prevOpen.current = open
    }, [open])

    const Component = component? component : Button
  
    const childrenProps = { 
        handleListKeyDown,
        onClose: handleClose,
        open,
    }


    return (
        <div className={className}>
            <Component 
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup={"true"}
                onClick={handleToggle}
                {...componentProps}
            >
                {title}
            </Component>
            <Popper 
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement={placement}
                style={{zIndex: 9999}}
            >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            { React.cloneElement(children, childrenProps) }                                                
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
            </Popper>
        </div>
    )
}

Popover.propTypes = {
    isOpen: PropTypes.bool,
    component: PropTypes.object,
    componentProps: PropTypes.object,
    title: PropTypes.string,
    listProps: PropTypes.object,
    //children: PropTypes.arrayOf(PropTypes.element),
    className: PropTypes.string,
}

export default Popover
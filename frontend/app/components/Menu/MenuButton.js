import React from 'react'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';


const MenuButton = ({
    isOpen=false,
    buttonContent=null,    
    title="",
    children,
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

    const renderButtonContent = buttonContent? buttonContent : () => title

    const childrenWithProps = React.Children.map(children, child => {
        const props = { 
            onClose: handleClose,
            open,
         }
         if (React.isValidElement(child)) {
             return React.cloneElement(child, props)
         }
         return child
    })

    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                variant="contained"
                {...props}
            >
                { renderButtonContent() }
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            {childrenWithProps}                            
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
            </Popper>
    </div>
    )
}

export default MenuButton
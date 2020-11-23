import React, { useState, useContext, useEffect } from 'react'
import PropTypes, { object } from 'prop-types'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl';
import { NavBarContext } from 'components/Nav'
import { usePrevious } from 'utils/hooks'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

const NestedMenuItem = ({
    children,
    title,
    IconComponent,
    ...rest
}) => {
    const intl = useIntl()
    const [open, setOpen] = useState(false)

    const {
        isDrawerOpen,
        handleDrawerOpen,
    } = useContext(NavBarContext)

    const prevIsDrawerOpen = usePrevious(usePrevious)

    useEffect(() => {
        if (prevIsDrawerOpen != isDrawerOpen && !isDrawerOpen) {
            setOpen(false)
        }
    }, [isDrawerOpen])

    const handleClick = () => {
        !open && !isDrawerOpen && handleDrawerOpen()
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <IconComponent />
                </ListItemIcon>
            <ListItemText primary={intl.formatMessage(title)} />
            {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                { isDrawerOpen && 
                    <List 
                        component="div"
                        disablePadding
                        style={{paddingLeft: "30px"}}
                    >
                        { React.Children.map(children, (
                            child => {
                                let props = { }
                                if (child.type.displayName != 'WithStyles(ForwardRef(Divider))') {
                                    Object.assign(props, {onClick: handleClick})
                                }
                                return (
                                    React.cloneElement(child, props)
                                )
                            }
                                
                        ))}
                    </List>
                }
            </Collapse>
            </div>
        </ClickAwayListener>
    )
}

NestedMenuItem.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element.isRequired),
    title: PropTypes.object.isRequired,
    IconComponent: PropTypes.object.isRequired,
}

export default NestedMenuItem
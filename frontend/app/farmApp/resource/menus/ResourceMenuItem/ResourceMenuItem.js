import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl';
import { NavBarContext } from 'components/Nav'
import { usePrevious } from 'utils/hooks'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const ResourceMenuItem = ({
    children,
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

    const style = { paddingLeft: "40px" }

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
            <ListItemText primary={intl.formatMessage(messages.title)} />
            {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                { isDrawerOpen && <List component="div" disablePadding>
                    { React.Children.map(children, (
                        child => React.cloneElement(child, {afterClick: handleClick, style})
                    ))}
                </List> }
            </Collapse>
        </>
    )
}

ResourceMenuItem.propTypes = {

}

export default ResourceMenuItem
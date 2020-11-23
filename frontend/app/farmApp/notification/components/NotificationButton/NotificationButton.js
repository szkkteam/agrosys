import React, { useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import moment from 'moment'

import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import { MenuButton } from 'components/Menu'
import { NotificationItem } from '../../components'

import './notificationbutton.scss'


const NotificationButton = ({

}) => {
    const notifications = [
        { id: 1, title: 'Possible pest risk!', description: "Your crop production my Wheat has high risk for whatever pest.", date: moment(Date.now()) },
        { id: 2, title: 'Possible pest risk!', description: 'Your crop production my Corn has high risk for whatever pest.', date: moment(Date.now()) },
        { id: 3, title: 'Task overdue!', description: 'Your task Harvesting is overdue by 2 day.', date: moment(Date.now()) },
        { id: 4, title: 'Task overdue!', description: 'Your task Harvesting is overdue by 2 day.', date: moment(Date.now()) }
    ]


    const MenuIconButton = useMemo(
        () => 
            forwardRef((props, ref) => 
                <IconButton
                    ref={ref}                    
                    aria-label="show 2 new notifications"
                    color="inherit"
                    {...props}
                >
                    <Badge badgeContent={Object.keys(notifications).length} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>                
            ) 
    )

    return (
        <MenuButton
            component={MenuIconButton}
            className="inline-block"
            listProps={{
                style: {width: "320px", overflow: "auto", height: "320px"}
            }}
        >
            { notifications && notifications.map((noti => (
                <NotificationItem
                    key={`notification-id-${noti.id}`}
                    {...noti}
                    //onClickFarm={(id) => console.log("Selected farm: ", id)}
                />
                )
            )) }
        </MenuButton>
    )
}

NotificationButton.propTypes = {

}

export default NotificationButton
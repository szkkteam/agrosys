import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import './notificationitem.scss'

const NotificationItem = ({
    id,
    title,
    description,
    date,
}) => {
    return (
        <>
        <ListItem 
            button
            style={{display: "flex", flexDirection: "column"}} alignItems="flex-start"
        >
            <Typography variant="body1" display="block" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" display="block">
                {description}
            </Typography>
            <Typography variant="caption" display="block">
                { date.format('MMMM DD, YYYY') }
            </Typography>
        </ListItem>
        <Divider />
        </>
    )
}



NotificationItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(moment).isRequired,
}

export default NotificationItem
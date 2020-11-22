import React, { useState } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames'

import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import InboxIcon from '@material-ui/icons/Inbox';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './blocklistitem.scss'

const BlockListItem = ({
    handleSelect,
    selected=false,
}) => {
    const data = {id: 123, title: 'My field', totalArea: 52, legalId: 'XMBC-72-14'}

    
    const [showMore, setShowMore] = useState(false)
    
    const onSelect = (data) => () => handleSelect(data)
    const handleShowMore = () => setShowMore(true)
    const handleHideMore = () => setShowMore(false) 

    return (
        <ListItem
            disableGutters={true}
            //selected={selected}
            onClick={onSelect(data)}
        >
            <Card 
                className={classnames('list-item', {
                    selected: selected,
                })}
            >
                <div 
                    className="list-container"
                    onMouseEnter={handleShowMore}
                    onMouseLeave={handleHideMore}
                >
                    <CardMedia  
                        className="list-cover"      
                        component="img"            
                        image="https://via.placeholder.com/48/48"
                    />
                    <CardContent
                        className="list-content"
                    >
                        <Typography
                            className="list-header"
                            variant="h2"
                        >
                            {data.title}, {data.totalArea} ha
                        </Typography>
                        <div className="list-meta">
                            ({data.legalId})
                        </div>
                    </CardContent>                            
                    <CardActions>
                        { showMore && <IconButton
                            className="list-action"
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                        >
                            <MoreVertIcon />
                        </IconButton> }
                    </CardActions>
                </div>
            </Card>
        </ListItem>
    )
}

BlockListItem.propTypes = {
    handleSelect: PropTypes.func,
    selected: PropTypes.bool,
}

export default BlockListItem
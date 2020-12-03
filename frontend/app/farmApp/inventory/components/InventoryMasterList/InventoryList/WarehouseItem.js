import React, { useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import { withLinkComponent } from 'utils/hoc'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { InventoryFillProgress } from '../..'
import { WAREHOUSE_SUB_ROUTE } from '../../../constants'

import './inventorylist.scss'

const LinkListItem = withLinkComponent(ListItem)

const WarehouseItem = ({
    data,
    //title,
    children
}) => {
    const [open, setOpen] = useState(false)
    const [showMore, setShowMore] = useState(false)

    const handleClick = (e) => {
        // TODO: Because the icon button is deeply in the DOM, the ListItem also catch the button click event
        // Therefore we need to stop the event propagation by call preventDefault()
        e.preventDefault()
        setOpen(!open);
    } 

    
    const handleShowMore = () => setShowMore(true)
    const handleHideMore = () => setShowMore(false) 

    const renderIcon = (Icon, props={}) => {
        return (
            <Icon 
                className="list-parent-expand"          
                onClick={handleClick}
                {...props}
            />

        )
    }

    return (
        <div>
        <LinkListItem
            to={data.id ? `/inventory/${WAREHOUSE_SUB_ROUTE}/${data.id}`: `/inventory`}
            button
            className="list-parent"
            //onClick={handleClick}
        >
            <Card
                //raised={true}
                onMouseEnter={handleShowMore}
                onMouseLeave={handleHideMore}
                className="list-item"
            >   
                { renderIcon(open? ExpandLess : ExpandMore, !React.Children.count(children)? {style: {opacity: 0}}: {} ) }
                <CardContent
                    className="list-content"
                >
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            className="list-header"
                            variant="h6"
                        >
                            {data.title}
                        </Typography>                        
                    </div>
                    <div>
                        <InventoryFillProgress 
                            current={data.current}
                            max={data.max}
                            unit={data.unit ?? ""}
                        />
                    </div>
                </CardContent>                            
                <CardActions>
                    { showMore && <IconButton                        
                        className="list-action-more"
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                    >
                        <MoreVertIcon />
                    </IconButton> }
                </CardActions>
            </Card>
        </LinkListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                { React.Children.map(children, (
                    child => {
                        let props = { }
                        return (
                            React.cloneElement(child, props)
                        )
                    }
                        
                ))}
            </List>
        </Collapse>
        </div>
    )
}

WarehouseItem.propTypes = {
    data: PropTypes.object.isRequired,
    //title: PropTypes.string.isRequired,
}

export default WarehouseItem
import React, { useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import { withLinkComponent } from 'utils/hoc'

import ListItem from '@material-ui/core/ListItem';
import StarBorder from '@material-ui/icons/StarBorder';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Typography from '@material-ui/core/Typography';

import { InventoryFillProgress } from '../..'
import { WAREHOUSE_SUB_ROUTE, BIN_SUB_ROUTE } from '../../../constants'

import './inventorylist.scss'

const LinkListItem = withLinkComponent(ListItem)

const BinItem = ({
    data,
}) => {
    const [showMore, setShowMore] = useState(false)

    const handleShowMore = () => setShowMore(true)
    const handleHideMore = () => setShowMore(false) 

    return (
        <LinkListItem
            button
            to={`/inventory/${WAREHOUSE_SUB_ROUTE}/${data.warehouseId}/${BIN_SUB_ROUTE}/${data.id}`}
            className="list-subitem"
            onMouseEnter={handleShowMore}
            onMouseLeave={handleHideMore}
        >
            <div className="list-content" >
                <div style={{ display: "flex", }} >
                    <Typography
                        className="list-header"
                        variant="body2"                        
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
            </div>                            
            { showMore && <IconButton    
                className="list-action-more"                    
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"                
            >
                <MoreVertIcon />
            </IconButton> }
        </LinkListItem>
    )
}

BinItem.propTypes = {
    //title: PropTypes.string.isRequired
    data: PropTypes.object.isRequired,
}

export default BinItem
import React from 'react'
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import BlockListItem from './BlockListItem'

import './blocklist.scss'

const BlockList = ({
    handleSelect,
}) => {
    return (  
        <List component="ul">
            <BlockListItem
                handleSelect={handleSelect}
                selected={true}
            />
            <BlockListItem
                handleSelect={handleSelect}
                selected={false}
            />
            <BlockListItem
                handleSelect={handleSelect}
                selected={false}
            />
        </List>        
    )
}

BlockList.propTypes = {
    handleSelect: PropTypes.func,

}

export default BlockList
import React from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages'

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import ListSubheader from '@material-ui/core/ListSubheader';
import BlockListItem from './BlockListItem'

import './blocklist.scss'

const BlockList = ({
    handleSelect,
}) => {
    return (  
        <List 
            component="ul"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    <FormattedMessage {...messages.listTitle} />
                </ListSubheader>
            }
        >
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
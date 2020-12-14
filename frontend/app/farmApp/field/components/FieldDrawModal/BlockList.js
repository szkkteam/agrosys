import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import messages from './messages'

import {
    Typography,
} from '@material-ui/core';

import { 
    MasterList
} from 'components'

import {
    BlockListItem
} from 'farmApp/block/components'

const Title = styled(Typography)`
    padding: 15px 0 10px 10px;
`

const BlockList = ({
    ...props
}) => {

    return (
        <>
            <Title variant="h6">
                <FormattedMessage {...messages.blockListTitle}/>
            </Title>
            <MasterList
                options={{
                    maxHeight: 1100,
                }}
                {...props}
            >
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
                <BlockListItem />
            </MasterList>
        </>
    )
}


BlockList.propTypes = {

}

export default BlockList
import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { 
    HeaderContentContext,
    MasterDetail,
    MasterList
} from 'components'

import {
    Grid,
    Portal
} from '@material-ui/core';

import {
    BlockViewButtons,
    BlockList,
    BlockListItem,
    BlockCreateButton
} from '../../components'

import { LeafletMap } from 'farmApp/map/components'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

const StyledBlockViewButtons = styled(props => <BlockViewButtons {...props} />)`
    float: right;
`

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const BottomButton = styled(forwardRef((props, ref) => <BlockCreateButton {...props} ref={ref} /> ))`
    position: absolute;
    margin-bottom: 10px;
    bottom: 0;
    left: 0;
    width: 100%;
`


const BlockLayout = ({
    history,
    match,
}) => {

    // TODO: Based on the URL query param, change the view later

    return (
        <Container>
            <Table
            >
                <TableHeader 
                    title={messages.title}
                    options={{
                        disableActions: true
                    }}
                />
                <MasterDetail
                >
                    <MasterList
                        addButton={
                            <BottomButton />
                        }
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
                    <LeafletMap />
                </MasterDetail>
            </Table>        
        </Container>
    )
}

BlockLayout.propTypes = {

}

export default BlockLayout
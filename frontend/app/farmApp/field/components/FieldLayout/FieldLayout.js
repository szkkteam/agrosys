import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { HeaderContentContext, MasterDetail } from 'components'

import {
    BlockList,
    BlockListItem
} from 'farmApp/block/components'

import { LeafletMap } from 'farmApp/map/components'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import {
    FieldCreateButton
} from '../../components'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`


const BottomButton = styled(props => <FieldCreateButton {...props} />)`
    position: absolute;
    margin-bottom: 10px;
    bottom: 0;
    left: 0;
    width: 100%;
`


const FieldLayout = ({

}) => {

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
                    <BlockList
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
                    </BlockList>
                    <LeafletMap />
                </MasterDetail>
            </Table>        
        </Container>
    )
}

FieldLayout.propTypes = {

}

export default FieldLayout
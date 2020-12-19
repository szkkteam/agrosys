import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { 
    MasterList,
    MasterDetail
} from 'components'

import { LeafletMap } from 'components/Map/components'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import {
    FieldCreateButton,
    FieldListItem
} from '../../components'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`


const BottomButton = styled(forwardRef((props, ref) => <FieldCreateButton {...props} ref={ref} /> ))`
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
                    <MasterList
                        options={{
                            maxHeight: 570,
                        }}
                        addButton={
                            <BottomButton />
                        }
                    >
                        <FieldListItem />
                        <FieldListItem />
                        <FieldListItem />
                        <FieldListItem />
                        <FieldListItem />
                        <FieldListItem />
                        <FieldListItem />
                        <FieldListItem />
                        <FieldListItem />
                    </MasterList>
                    <LeafletMap />
                </MasterDetail>
            </Table>        
        </Container>
    )
}

FieldLayout.propTypes = {

}

export default FieldLayout
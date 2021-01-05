import React, { useContext, useMemo, useState, forwardRef, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { useHeightDifference } from 'utils/hooks'

import { 
    MasterDetail,
    PrimaryActionButton
} from 'components'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import { 
    Grid,
    Typography
}  from '@material-ui/core';

import {
    InventoryList
} from '../../components'

const subHeaderMargin = 20

const columns = [
    { title: 'Name', field: 'title'},
    { title: 'Active', field: 'isActive', type: 'boolean'},
    //{ title: 'Address', field: 'address', hidden: true}
]

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const DetailContainer = styled.div`
    height: 100%;
`

const TableSubHeader = styled(Typography)`
    border-bottom: 2px solid black;
    padding: ${subHeaderMargin}px 0;
`

const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`

/*

*/

const DetailPanel = ({

}) => {

    const titleRef = useRef(null)
    const detailRef = useRef(null)
    // FIXME: Something is not working properly here with the height ...
    const height = useHeightDifference(detailRef, titleRef, 500)
    return (
        <DetailContainer
            ref={detailRef}
        >
            <TableSubHeader
                ref={titleRef}
                variant="h5"
            >
                Items - Bin 1
            </TableSubHeader>
            <TableBody
                columns={columns}
                height={height - 45}
            />
        </DetailContainer>
    )
}
/*
<TableBody
                height={height}
            />
*/

const InventoryLayout = ({
    
}) => {
    return (
        <Container>
            <Table
            >
                <TableHeader
                    title={messages.title}
                >   
                    <Grid
                        container
                        justify="flex-end"
                    >
                        <FlexGrid item xs={9}>
                            <Spacer />
                            <PrimaryActionButton
                                title={messages.addNewTitle}
                            />
                        </FlexGrid>
                        <Grid item xs={3}>                            
                        </Grid>
                    </Grid>
                </TableHeader>
                <MasterDetail
                >
                    <InventoryList />
                    <DetailPanel />
                </MasterDetail>
            </Table>
        </Container>
    )
}

InventoryLayout.propTypes = {

}

export default InventoryLayout
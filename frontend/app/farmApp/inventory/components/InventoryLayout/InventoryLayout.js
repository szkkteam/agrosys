import React, { useContext, useMemo, useState, forwardRef, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { useHeightDifference } from 'utils/hooks'

import { 
    MasterDetail,
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

const subHeaderMargin = 10

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
    margin: ${subHeaderMargin}px 0;
`

/*

*/

const DetailPanel = ({

}) => {

    const titleRef = useRef(null)
    const detailRef = useRef(null)

    const height = useHeightDifference(detailRef, titleRef, 500)

    return (
        <DetailContainer
            ref={detailRef}
        >
            <TableSubHeader
                ref={titleRef}
                variant="h4"
            >
                Items - Bin 1
            </TableSubHeader>
            <TableBody
                height={height - subHeaderMargin}
            />
        </DetailContainer>
    )
}

const Body = ({
    height,
    columns,
}) => {
    return (
        <MasterDetail
        >
            <div>Master</div>
            <DetailPanel
                height={height}
                columns={columns}
            />
        </MasterDetail>
    )
}

const InventoryLayout = ({
    
}) => {

    const containerRef = useRef(null)
    /*
    const titleRef = useRef(null)
    const detailRef = useRef(null)

    const height = useHeightDifference(detailRef, titleRef, 500)
    */
    return (
        <Container
            ref={containerRef}
        >
            <Table
                columns={columns}
            >
                <TableHeader 
                    title={messages.title}
                />
                <MasterDetail
                >
                    <div>Master</div>
                    <DetailPanel />
                </MasterDetail>
            </Table>
        </Container>
    )
}

InventoryLayout.propTypes = {

}

export default InventoryLayout
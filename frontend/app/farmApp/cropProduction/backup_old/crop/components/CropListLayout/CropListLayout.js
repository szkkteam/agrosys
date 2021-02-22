import React, { useContext, useMemo, useState, forwardRef, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { withLinkComponent } from 'utils/hoc'
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

const CropListLayout = ({
    
}) => {
    return (
        <MasterDetail
        >
            <div>List items</div>
            <DetailPanel />
        </MasterDetail>
    )
}

CropListLayout.propTypes = {

}

export default CropListLayout
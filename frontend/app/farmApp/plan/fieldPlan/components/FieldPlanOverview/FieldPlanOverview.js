import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { color } from '@material-ui/system'

import {
    Typography,
    Tooltip
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import {
    Table,
} from 'farmApp/components'

import {
    FieldListItemBoundary
} from 'farmApp/resource/field/components'

import {
    CropTag
} from 'farmApp/product/crop/components'

const YieldTred = styled(KeyboardArrowUpIcon)`
    ${color}
    cursor: pointer;
`

const FieldPlanOverview = ({

}) => {
    const intl = useIntl()

    return (
        <Table
            data={[
                {test: "test 1", cropType: {title: "Őszi búza", short: "őb"}},
                {test: "asd", cropType: {title: "Lucerna", short: "lu"}},
                {test: "bbb", cropType: {title: "Kukorica", short: "ku"}},
                {test: "cica", cropType: {title: "Árpa", short: "ár"}},
                {test: "test 1", cropType: {title: "Őszi búza", short: "őb"}},
                {test: "asd", cropType: {title: "Lucerna", short: "lu"}},
                {test: "bbb", cropType: {title: "Kukorica", short: "ku"}},
                {test: "cica", cropType: {title: "Árpa", short: "ár"}},
            ]}
            columns={[
                {
                    title: intl.formatMessage(messages.title),
                    field: 'test'
                },
                {
                    title: intl.formatMessage(messages.boundary),
                    render: (rowData) => (
                        <FieldListItemBoundary />
                    )
                },
                {
                    title: intl.formatMessage(messages.area),
                    field: 'test'
                },
                {
                    title: intl.formatMessage(messages.crop),
                    render: (rowData) => (
                        <>
                        <Typography variant="body2">
                            Őszi búza - 2020
                        </Typography>
                        <CropTag {...rowData.cropType} defaultExpand/>
                        </>
                    )
                },
                {
                    title: intl.formatMessage(messages.yield),
                    render: (rowData) => (
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Tooltip title="23% more than in season 2019">
                                <YieldTred color="success.main" />
                            </Tooltip>
                            <Typography variant="body2">
                                9.7 t
                            </Typography>
                        </div>
                    )
                }

            ]}
            options={{
                pageSize: 10,
            }}
            filterProps={{
                /*
                filters: [
                    {id: '1', title: 'filter 1'},
                    {id: '2', title: 'filter 2'},
                    {id: '3', title: 'filter 3'}
                ],
                */
                content: (
                    <div>content</div>
                )
            }}
        />
    )
}

FieldPlanOverview.propTypes = {

}

export default FieldPlanOverview
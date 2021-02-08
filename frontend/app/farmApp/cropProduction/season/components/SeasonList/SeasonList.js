import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import { ROUTES } from 'farmApp/routes'
import { useRouteMap } from 'utils/hooks'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

const data = [
    {'title': 'Wheat 2020', startDate: '2020 April 10', endDate: '2020 November 20', planYield: '6 tonn', status: 'Planned'},
    {'title': 'Wheat 2019', startDate: '2019 September 6', endDate: '2020 Januar 20', planYield: '6 tonn', status: 'In progress'},
    {'title': 'Wheat 2018', startDate: '2018 September 6', endDate: '2019 Januar 20', planYield: '6 tonn', status: 'Archived'},
]

const SeasonList = ({
    height: parentHeight,
    ...props
}) => {
    const intl = useIntl()
    const history = useHistory()
    const { cropId, productionId } = useParams()
    const route = useRouteMap(ROUTES.Production)

    const columns = [
        { title: 'Season', field: 'title'},
        { title: 'Start Date', field: 'startDate'},
        { title: 'End Date', field: 'endDate'},
        { title: 'Planned Yield', field: 'planYield' },
        { title: 'Status', field: 'status' , defaultGroupOrder: 0, defaultGroupSort: 'desc'}
    ]

    const handleRowClick = (e, rowData) => {
        history.push(route.toPath({cropId, productionId}))
    }

    console.debug("data: ", data)

    return (
            <TableBody
                columns={columns}
                height={parentHeight}
                data={data}
                onRowClick={handleRowClick}
                options={{
                    grouping: true,
                    defaultExpanded: true,
                    groupTitle: (d) => "Season status"
                }}
                components={{
                    Groupbar: () => null,
                }}
                {...props}
            />
    )
}

SeasonList.propTypes = {

}

export default SeasonList

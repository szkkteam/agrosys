import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import { useHeightDifference } from 'utils/hooks'

const data = [
    {'title': 'Wheat 2020', startDate: '2020 April 10', endDate: '2020 November 20', planYield: '6 tonn', status: 'Planned'},
    {'title': 'Wheat 2019', startDate: '2019 September 6', endDate: '2020 Januar 20', planYield: '6 tonn', status: 'In progress'},
    {'title': 'Wheat 2018', startDate: '2018 September 6', endDate: '2019 Januar 20', planYield: '6 tonn', status: 'Archived'},
]

const ProductionListLayout = ({
    height: parentHeight,
    ...props
}) => {
    const intl = useIntl()

    const headerRef = useRef(null)

    const columns = [
        { title: 'Season', field: 'title'},
        { title: 'Start Date', field: 'startDate'},
        { title: 'End Date', field: 'endDate'},
        { title: 'Planned Yield', field: 'planYield' },
        { title: 'Status', field: 'status' , defaultGroupOrder: 0, defaultGroupSort: 'desc'}
    ]

    console.debug("data: ", data)

    return (
            <TableBody
                columns={columns}
                height={parentHeight}
                data={data}
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

ProductionListLayout.propTypes = {

}

export default ProductionListLayout

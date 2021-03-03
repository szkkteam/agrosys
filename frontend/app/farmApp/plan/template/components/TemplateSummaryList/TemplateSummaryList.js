import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'


import GridTable from 'farmApp/components/GridTable'

import {
    Typography
} from '@material-ui/core'

const SimpleText = ({title}) => <Typography variant="body2">{title}</Typography>

const TemplateSummaryList = ({

}) => {
    const data = [
        {plannedStart: "2020 oktober 1", plannedEnd: "2020 oktober 20", task: "Liming", category: "Fertilizing", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed purus felis. Aenean eleifend iaculis sapien at consectetur. Donec eleifend sem at nibh luctus, eu suscipit augue sodales."},
        {plannedStart: "2020 november 10", plannedEnd: "2020 nobember 15", task: "Shallow plowing", category: "Tillage", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed purus felis. Aenean eleifend iaculis sapien at consectetur. Donec eleifend sem at nibh luctus, eu suscipit augue sodales."},
        {plannedStart: "2020 november 25", plannedEnd: "2020 nobember 30", task: "Sowing", category: "Planting", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed purus felis. Aenean eleifend iaculis sapien at consectetur. Donec eleifend sem at nibh luctus, eu suscipit augue sodales."},
        {},
    ]

    const columns = [
        {title: 'Planned start', render: ({plannedStart}) => <SimpleText title={plannedStart} /> },
        {title: 'Planned end', render: ({plannedEnd}) => <SimpleText title={plannedEnd} /> },
        {title: 'Task', render: ({task}) => <SimpleText title={task} /> },
        {title: 'Category', render: ({category}) => <SimpleText title={category} /> },
        {title: 'Description', size: 1.5, render: ({description}) => <SimpleText title={description} /> },
    ]

    return (
        <GridTable
            data={data}
            columns={columns}
            onRowClick={(e, r) => console.debug("rowData: ", r)}
        />
    )
}

TemplateSummaryList.propTypes = {

}

export default TemplateSummaryList
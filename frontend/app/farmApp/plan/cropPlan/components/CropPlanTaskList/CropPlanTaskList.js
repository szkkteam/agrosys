import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useGroupBy } from 'utils/hooks'

import { TemplateListItem } from 'farmApp/plan/template/components'

import {
    Paper,
    List,
    ListSubheader,
} from '@material-ui/core'


const PinnedList = styled(List)`
    ${({theme}) => `
        width: 100%;
        position: relative;
        overflow: auto;
        max-height: 760px;
        background-color: ${theme.palette.background.paper}
    `}    
`

const PinnedUl = styled(Paper)`
    background-color: inherit;
    padding: 0;
`

const PinnedLi = styled.li`
    background-color: inherit;
`

const CropPlanTaskList = ({

}) => {
    const cropType = {
        title: "Őszi búza",
        short: "őb"
    }
    const tasks = [
        {title: "Disking", startDate: new Date(2021, 5, 12), type: "Tiling"},
        {title: "Corn planting", startDate: new Date(2021, 6, 22), type: "Planting"},
        {title: "Harvesting", startDate: new Date(2021, 8, 13), type: "Harvest"},
        {title: "Disking", startDate: new Date(2021, 5, 12), type: "Tiling"},
        {title: "Corn planting", startDate: new Date(2021, 6, 22), type: "Planting"},
        {title: "Harvesting", startDate: new Date(2021, 8, 13), type: "Harvest"},
        {title: "Disking", startDate: new Date(2021, 5, 12), type: "Tiling"},
        {title: "Corn planting", startDate: new Date(2021, 6, 22), type: "Planting"},
        {title: "Harvesting", startDate: new Date(2021, 8, 13), type: "Harvest"},
    ]

    const grouped = useGroupBy(tasks, task => task.type)

    const taskTypes = ['Tiling', 'Planting', 'Harvest']

    return (
        <PinnedList
            subheader={
                <li/>
            }
        >
            {taskTypes.map((type) => (
                <PinnedLi key={`group-${type}`}>
                    <PinnedUl component='ul'>
                        <ListSubheader>{type}</ListSubheader>
                        {grouped.get(type).map(({title}, i) => (
                            <TemplateListItem key={`item-${title}-${i}`}
                                title={title}
                                cropType={cropType}
                            />
                        ))}
                    </PinnedUl>
                </PinnedLi>
            ))}
        </PinnedList>

    )
}

CropPlanTaskList.propTypes = {

}

export default CropPlanTaskList
import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { SimpleTable } from 'farmApp/components'

import {
    FieldListItem,
} from 'farmApp/resource/field/components'

import {
    TaskListItem
} from 'farmApp/cropProduction/task/components'


const CropField = ({

}) => {
    const data = [
        { fieldId: 1, nextTask: {title: "Harvesting", area: 136791, dates: {start: new Date(2021, 3, 26)}}, },
        { fieldId: 1, nextTask: {title: "Harvesting", area: 136791, dates: {start: new Date(2021, 3, 26)}}, },
        { fieldId: 1, nextTask: {title: "Harvesting", area: 136791, dates: {start: new Date(2021, 3, 26)}}, },
        { fieldId: 1, nextTask: {title: "Harvesting", area: 136791, dates: {start: new Date(2021, 3, 26)}}, },
    ]

    const columns = [
        {
            title: 'Field',
            render: (row, i) => (
                <FieldListItem
                    disableAction
                    disableButton
                    id={row.fieldId}
                />
            )
        },
        {
            title: 'Vaiant',
            render: (row, i) => (
                <span>Abonyi búza</span>
            )
        },  
        {
            title: 'Predicted yield',
            render: (row, i) => (
                <span>9t</span>
            )
        },      
        {
            title: 'Upcoming task',
            render: (row, i) => (
                <TaskListItem 
                    disableButton
                    {...row.nextTask}
                />
            )
        }
    ]

    return (
        <SimpleTable
            columns={columns}
            data={data}            
        />        
    )
}

CropField.propTypes = {

}

export default CropField
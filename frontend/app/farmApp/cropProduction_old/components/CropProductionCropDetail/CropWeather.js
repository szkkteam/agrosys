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


const CropWeather = ({

}) => {
    const data = [
        {fieldId: 1}
    ]

    const columns = [
        {
            title: 'Field',
            render: (row, i) => (
                <FieldListItem
                    disableAction={true}
                    id={row.fieldId}
                />
            )
        },
        {
            title: 'Vaiant',
            render: (row, i) => (
                <span>variant</span>
            )
        },        
    ]

    return (
        <SimpleTable
            columns={columns}
            data={data}            
        />        
    )
}

CropWeather.propTypes = {

}

export default CropWeather
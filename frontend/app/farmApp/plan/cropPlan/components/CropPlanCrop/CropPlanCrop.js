import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    ExpandPanel
} from 'farmApp/components'
import { ItemMenu } from 'components'

import SettingsIcon from '@material-ui/icons/Settings';
import {
    Typography,
    IconButton
} from '@material-ui/core'

import CropSummary from './CropSummary'
import CropPlanTasks from './CropPlanTasks'

const Flex = styled.div`
    display: flex;
    align-items: center;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const CropPlanCrop = ({
    cropPlanId,
    ...props
}) => {
    // TODO: Fetch the data based on cropPlanId
    const payload = {
        title: "Őszi búza - 2020",
        cropType: {
            title: "Őszi búza",
            short: "őb"
        },
        tasks: [
            {title: "Disking", startDate: new Date(2021, 5, 12), type: "Tiling"},
            {title: "Corn planting", startDate: new Date(2021, 6, 22), type: "Planting"},
            {title: "Harvesting", startDate: new Date(2021, 8, 13), type: "Harvest"}
        ]
        
    }

    const menuItems = [
        {title: globalMessages.edit, onClink: null},
        //{title: messages.edit, onClink: null},
        {title: globalMessages.delete, onClink: null}
    ]

    return (
        <ExpandPanel
            {...props}
            summary={
                <>
                    <CropSummary
                        title={payload.title}
                        cropType={payload.cropType}
                    />
                    <Spacer />
                    <ItemMenu 
                        size="small"
                        icon={SettingsIcon}
                        items={menuItems}
                    />                    
                </>
            }
        >
            <CropPlanTasks
                data={payload.tasks}
            />
        </ExpandPanel>
    )
}

CropPlanCrop.propTypes = {

}

export default CropPlanCrop
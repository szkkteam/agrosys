import React, { useState, useRef, useLayoutEffect, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import messages from './messages';
import { format } from 'date-fns';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useGroupBy } from 'utils/hooks'

import { TemplateListItem } from 'farmApp/plan/template/components'
import { taskTypeOptions } from 'farmApp/operation/task/constants'

import {
    Paper,
    List,
    ListSubheader,
} from '@material-ui/core'

import { useSelectTaskIdsByCropPlanGroupByType } from '../../hooks'


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
    cropPlanIds,
    ...props
}) => {
    const { payload, isLoading } = useSelectTaskIdsByCropPlanGroupByType(cropPlanIds)

    return (
        <PinnedList
            subheader={
                <li/>
            }
        >
            {taskTypeOptions.map(({id: type, title}) => (
                <PinnedLi key={`group-${type}`}>
                    <PinnedUl component='ul'>
                        <ListSubheader>
                            <FormattedMessage {...title} />
                        </ListSubheader>
                        {!isLoading && payload.get(type) && payload.get(type).map(({title, cropPlanId}, i) => (
                            <TemplateListItem key={`item-${title}-${i}`}
                                title={title}
                                cropPlanId={cropPlanId}
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
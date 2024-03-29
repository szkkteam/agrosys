import React, { useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
import messages from './messages';
import { FormattedMessage, useIntl } from 'react-intl'
import { differenceInCalendarDays, add } from 'date-fns'
import { spacing } from '@material-ui/system'
import styled from 'styled-components'

import {
    Tabs
} from 'components'

import {
    Grid,
    Typography
} from '@material-ui/core'

import DoneIcon from '@material-ui/icons/Done';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import TaskDetailOverview from '../TaskDetailOverview/TaskDetailOverview'

const Flex = styled.div`
    ${spacing}
    display: flex;
    align-items: center;
`

const InfoTitle = styled(Typography)`
    ${spacing}
`

const TaskDetail = ({

}) => {
    const intl = useIntl()
    const dueDate = differenceInCalendarDays(add(new Date(), {days: 14}), new Date())

    return (
        <>
            <Flex ml={-2}>
                <Flex m={2} mt={1}>
                    <DoneIcon />
                    <InfoTitle pl={1} variant="body2">
                        <FormattedMessage {...globalMessages.done} />
                    </InfoTitle>
                </Flex>
                <Flex m={2} mt={1}>
                    <CalendarTodayIcon />
                    <InfoTitle pl={1} variant="body2">
                        {`${intl.formatMessage(globalMessages.deadline)} ${intl.formatRelativeTime(dueDate, 'days')}`}
                    </InfoTitle>
                </Flex>                
            </Flex>
            <Tabs
                //value={tab}
                hash
                //onChange={setTab}
                divider
                tabs={[
                    {title: messages.overview, value: 'overview'},
                    {title: messages.plan, value: 'plan'},
                    {title: messages.schedule, value: 'schedule'},
                    {title: messages.activity, value: 'activity'},
                    {title: messages.field, value: 'field'},
                ]}
            >
                <TaskDetailOverview
                />
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </Tabs>
        </>
    )
}

TaskDetail.propTypes = {

}

export default TaskDetail
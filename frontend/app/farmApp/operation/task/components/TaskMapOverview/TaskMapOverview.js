import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    MasterDetail
} from 'components'

import TaskMapMaster from '../TaskMapMaster/TaskMapMaster'
import TaskMapDetail from '../TaskMapDetail/TaskMapDetail'

const TaskMapOverview = ({

}) => {

    return (
        <MasterDetail
            spacing={0}
        >
            <TaskMapMaster
            />
            <TaskMapDetail
            />
        </MasterDetail>
    )
}

TaskMapOverview.propTypes = {

}

export default TaskMapOverview
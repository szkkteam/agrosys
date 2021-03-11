import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    PageHeader 
} from 'components'

import {
    Paper,
    Typography
} from '@material-ui/core'

import TaskMasterList from '../TaskMasterList/TaskMasterList'

const Container = styled(Paper)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

const TaskMapMaster = ({

}) => {

    return (
         <Container>
             <PageHeader
                title="Current activites"
             />
            
             <TaskMasterList
            />
         </Container>
    )
}

TaskMapMaster.propTypes = {

}

export default TaskMapMaster
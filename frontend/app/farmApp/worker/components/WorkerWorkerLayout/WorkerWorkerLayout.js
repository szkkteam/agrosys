import React, { useLayoutEffect, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'

import Grid from '@material-ui/core/Grid';

import { TableHeader } from 'components/Table'

import {
    WorkerContentHeader,
    WorkerTableWorkers
} from '../../components'

//<WorkerTableWorkers />

const WorkerWorkerLayout = ({

}) => {

    return (
        <WorkerTableWorkers />

    )
}

WorkerWorkerLayout.propTypes = {

}

export default WorkerWorkerLayout
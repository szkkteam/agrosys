import React, { useLayoutEffect, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'

import Grid from '@material-ui/core/Grid';

import {
    WorkerContentHeader,
    WorkerTableWorkers
} from '../../components'

//<WorkerTableWorkers />

const WorkerWorkerLayout = ({

}) => {
    const parentRef = useRef(null)
    const headerRef = useRef(null)
    const [height, setHeight] = useState(700)

    useLayoutEffect(() => {
        if (parentRef.current && headerRef.current) {
            setHeight(parentRef.current.clientHeight - headerRef.current.clientHeight)
        }
    }, [parentRef])

    return (
        <div 
            ref={parentRef}
            style={{height: "100%"}}
        >
            <WorkerContentHeader
                //ref={headerRef}
            />
            <WorkerTableWorkers
                height={height}
            />
        </div>

    )
}

WorkerWorkerLayout.propTypes = {

}

export default WorkerWorkerLayout
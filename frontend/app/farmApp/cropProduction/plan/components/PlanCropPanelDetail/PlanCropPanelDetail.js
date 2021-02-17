




import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core'

import FieldRow from './FieldRow'

const PlanCropPanelDetail = ({

}) => {
    const data = [1,2,3]
    return (
        <TableContainer>
            <Table
                size="small"
                //padding="checkbox"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            
                        </TableCell>
                        <TableCell>Field</TableCell>
                        <TableCell>Variant</TableCell>
                        <TableCell>Yield</TableCell>
                        <TableCell>Crop code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data, i) => (
                        <FieldRow key={i} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

PlanCropPanelDetail.propTypes = {

}

export default PlanCropPanelDetail
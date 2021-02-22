




import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import {
    Button,
    Typography,
    IconButton,
    Collapse,

    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

} from '@material-ui/core'

import {
    FieldListItem,
} from 'farmApp/resource/field/components'

const Spacer = styled.div`
    flex-grow: 1;
`

const Flex = styled.div`
    display: flex;
`

const FieldRow = ({

}) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow>
                <TableCell style={{width: "40px"}}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell style={{width: "280px"}}>
                    <FieldListItem />
                </TableCell>
                <TableCell>ABONY</TableCell>
                <TableCell>9t</TableCell>
                <TableCell>KTG-45</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <TableContainer >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Secondary crop</TableCell>
                                        <TableCell>Variant</TableCell>
                                        <TableCell>Eco</TableCell>
                                        <TableCell>Crop code</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{width: "40px"}}/>
                                        <TableCell style={{width: "280px"}}>Lucerna</TableCell>
                                        <TableCell>ABONY</TableCell>
                                        <TableCell>Yes</TableCell>
                                        <TableCell>CCC-43</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Flex>
                            <Spacer/>
                            <IconButton
                                //onClick={this.handleDeleteParcel(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Flex>

                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

FieldRow.propTypes = {

}

export default FieldRow
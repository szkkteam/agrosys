import React from 'react'
import { useTable } from 'react-table'
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';


export default ({
    columns,
    data
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
    })
    console.log("headerGroups: ", headerGroups)
    console.log("rows: ", rows)

    return (
        <TableContainer component={Paper}>
            <Table {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow  {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                    <TableCell  {...cell.getCellProps()}>{cell.render('Cell')}</TableCell >
                                    )
                                })}
                            </TableRow >
                        )
                    })}
                </TableBody>
            </Table>       
        </TableContainer> 
    )
}
import React from 'react'

import Button from '@material-ui/core/Button';

import { 
    Table,
  } from 'components/Table'

import './parcellist.scss'

import {
    convertM2ToHa,
} from 'utils/converter'

export default ({
    parcels,
    options,
    components,
    ...props,
}) => {
    // Keep this log, because parcelTree is not updated at the first time
    console.log("Parcels: ", parcels)
    return (     
        <div className="scroll-table">
            <Table
                columns={[
                    { 
                        title: 'Title',
                        field: 'title',
                        filtering: false,
                        search: false,
                    },
                    {
                        title: 'Area',
                        field: 'totalArea',
                        render: (rowData) => <span>{convertM2ToHa(rowData.totalArea)} Ha</span>,
                        customSort: (a, b) => b.totalArea - a.totalArea 
                    }
                ]} 
                emptyRowsWhenPaging={false}
                data={parcels} 
                style={{overflowX: "hidden"}}             
                parentChildData={(row, rows) => rows.find(a => a.id === row.parentParcelId)}
                options={{
                    pageSize: parcels.length,
                    doubleHorizontalScroll: true,
                    headerStyle: { position: 'sticky', top: 0 }, // Sticky on header is not working ...
                    maxBodyHeight: '650px',
                    search: false,
                    ...options,
                }}
                components={{
                    Pagination: props => null,
                    //Toolbar: props => null,
                    //Header: props => (<thead><tr><th>Header</th></tr></thead>),
                    ...components,
                }}
                {...props}
            />                
        </div>
    )
}
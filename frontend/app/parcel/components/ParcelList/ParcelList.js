import React from 'react'

import Button from '@material-ui/core/Button';

import { 
    Table,
  } from 'components/Table'

import './parcellist.scss'


export default ({
    parcels,
    options,
    ...props,
}) => {
    return (     
        <div style={{ maxWidth: "100%", }}>
            <Table className="scroll-table"
                columns={[
                    {
                        title: 'Title',
                        field: 'title',
                        filtering: false,
                        search: false,
                    }, 
                ]} 
                emptyRowsWhenPaging={false}
                data={parcels} 
                title="Parcels"                
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
                }}
                {...props}
            />                
        </div>
    )
}
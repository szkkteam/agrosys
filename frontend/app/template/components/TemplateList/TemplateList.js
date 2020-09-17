import React from 'react'

import Button from '@material-ui/core/Button';

import { 
    Table,
  } from 'components/Table'

import './templatelist.scss'


export default ({
    templates,
    options,
    components,
    ...props,
}) => {
    // Keep this log, because parcelTree is not updated at the first time
    //console.log("templates: ", templates)
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
                ]} 
                emptyRowsWhenPaging={false}
                data={templates} 
                style={{overflowX: "hidden"}}             
                options={{
                    pageSize: templates.length,
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
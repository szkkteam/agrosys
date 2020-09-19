import React from 'react'

import Button from '@material-ui/core/Button';
import MaterialTable from "material-table";

import { 
    Table,
  } from 'components/Table'

import './seasonlist.scss'

export default ({
    seasons,
    onAdd,
    options,
    ...props,
}) => { 
    return (    
        <div style={{ maxWidth: "100%", minWidth: "200px" }}>
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
                data={seasons} 
                //title="Seasons"
                components={{
                    Pagination: props => null,
                    Toolbar: props => null,
                    //Header: props => null,
                }}
                options={{
                    pageSize: seasons.length,
                    ...options,
                }}
                {...props}
            />
            <Button
                style={{width: "100%"}}
                variant="contained"
                color="primary"
                onClick={onAdd}
            >   
                Create New
            </Button>
        </div>
    )
}
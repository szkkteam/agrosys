import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'

import { Table } from 'components'

const data = [
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},
    { title: 'Valami item ', quantity: '5l', manufacturer: 'Random ceg'},

    
]


const columns = [
    { title: 'Name', field: 'title'},
    { title: 'Quantity', field: 'quantity'},
    { title: 'Manufacturer', field: 'manufacturer' },
    //{ title: 'Bin', field: 'bin'}
]

const InventoryDetail = ({
    match
}) => {
    console.log("Warehouse: ", match.params?.warehouseId)
    console.log("Bin: ", match.params?.binId)

    return (
        <Table
            columns={columns}
            data={data}
            options={{
                toolbar: false,
                paging: false,
                maxBodyHeight: 760,
                headerStyle: { position: 'sticky', top: 0 },
            }}
            components={{
                //Header: TableHeader
            }}
            //{...props}
        />
    )
}

InventoryDetail.propTypes = {

}

export default InventoryDetail

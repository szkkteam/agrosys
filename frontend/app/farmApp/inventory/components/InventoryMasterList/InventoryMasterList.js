import React, { useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import { 
    BinItem,
    WarehouseItem
} from './InventoryList'
    
const InventoryMasterList = ({

}) => {
    return (
    <List
        component="ul"
        aria-labelledby="nested-list-subheader"
        subheader={
        <ListSubheader component="div" id="nested-list-subheader">
            Warehouse list
        </ListSubheader>
        }
    >
        <WarehouseItem
            data={{
                title: "All warehouses",
                current: 23200 + 100 + 12200 + 50000,
                max: 1000 + 24000 + 50000 + 50000 + 50000,
            }}
        />
        <WarehouseItem
            data={{
                id: 1,
                title: "Default warehouse",
                current: 23200 + 100 + 12200,
                max: 1000 + 24000 + 50000,
            }}
        >
            <BinItem 
                data={{
                    id: 1,
                    warehouseId: 1,
                    title: "Fuel barrel",
                    current: 100,
                    max: 1000,
                    unit: "liter"
                }}
            />
            <BinItem 
                data={{
                    id: 2,
                    warehouseId: 1,
                    title: "Manure storage",
                    current: 23200,
                    max: 24000,
                    unit: "kilogram"
                }}
            />
            <BinItem 
                data={{
                    id: 3,
                    warehouseId: 1,
                    title: "Slury storage",
                    current: 12200,
                    max: 50000,
                    unit: "kilogram"
                }}
            />
        </WarehouseItem>
        <WarehouseItem
            data={{
                id: 2,
                title: "Silo",
                current: 50000,
                max: 50000 + 50000,
                unit: "liter"
            }}
        >
            <BinItem 
                data={{
                    id: 4,
                    warehouseId: 2,
                    title: "Wheat silo",
                    current: 50000,
                    max: 50000,
                    unit: "liter"
                }}
            />
            <BinItem 
                data={{
                    id: 5,
                    warehouseId: 2,
                    title: "Corn Silo",
                    current: 0,
                    max: 50000,
                    unit: "liter"
                }}
            />
        </WarehouseItem>
    </List>
    )
}

InventoryMasterList.propTypes = {

}

export default InventoryMasterList
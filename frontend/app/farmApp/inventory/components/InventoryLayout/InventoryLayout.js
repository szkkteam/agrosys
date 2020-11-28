import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import { 
    SearchButton,
    HeaderContent,
    MasterDetail,
} from 'components'

import {
    InventoryDetail,
    InventoryMasterList
} from '../../components'

//const Detail = ({match}) => <div>Detail for: {match.params.id}</div>
const Dashboard = ({}) => <div>Dashboard</div>

const InventoryLayout = ({
    match
}) => {
    return (
        <HeaderContent
            header={
                <div
                    style={{flexGrow: 1, marginRight: "15px"}}
                >
                    <SearchButton style={{float: "right"}}/>
                </div>
            }
            content={
                <MasterDetail
                    master={
                        <InventoryMasterList
                        />
                    }
                    detail={
                        <>                            
                            <Route
                                // TODO: Currently this route is copy pasted just matching the simple warehouse view also
                                path={`${match.path}/warehouse/:warehouseId([0-9]+)`}
                                exact
                                component={(props) => <InventoryDetail {...props}/>}
                            />
                            <Route
                                path={`${match.path}/warehouse/:warehouseId([0-9]+)/bin/:binId([0-9]+)`}
                                exact
                                component={(props) => <InventoryDetail {...props}/>}
                            />
                            <Route 
                                path={`${match.path}`}
                                exact
                                component={(props) => <Dashboard {...props} />}
                            />
                        </>
                    }
                />                
            }
        />
    )
}

InventoryLayout.propTypes = {

}

export default InventoryLayout
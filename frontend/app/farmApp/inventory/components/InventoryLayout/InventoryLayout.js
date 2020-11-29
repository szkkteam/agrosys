import React from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import { 
    Grid,
    Typography
}  from '@material-ui/core';


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
                <Grid 
                    container
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Typography 
                            variant="h4"
                            gutterBottom={true}
                        >
                            Inventory
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchButton style={{float: "left"}}/>
                    </Grid>
                </Grid>

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
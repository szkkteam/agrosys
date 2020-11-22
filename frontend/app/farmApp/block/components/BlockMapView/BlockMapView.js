import React from 'react'
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl'

import Button from '@material-ui/core/Button';

import { MasterDetail } from 'components'
import { Route } from "react-router-dom";

import { LeafletMap } from 'farmApp/map/components'

import { BlockCreateButton } from '../../components'
import { BlockList } from './BlockList'

import './blockmapview.scss'

const Detail = ({
    match,
    ...rest
}) => {
    console.log("Detail props: ", rest)
    return (
        //<div>Detail of: {match.params.id}</div>
        <LeafletMap />
    )
}

const Create = ({
    ...props
}) => {
    return (
        <div>Create new</div>
    )
}

const Dashboard = ({
    ...rest
}) => {
    return (
        <LeafletMap />
    )
}

const BlockMapView = ({
    location,
    history,
    match,
    ...props
}) => {

    const handleSelect = () => {
        // TODO: if already selected de select. Handled by redux
        const id = 1323

        history.push({
            pathname: `${match.path}/${id}`,
            search: location.search
        })
    }

    console.log("BlockCreateButton: ", BlockCreateButton)

    // 1) The master component should be the list of blocks
    // 2) The detail component should have 2 variant: (it should render the small detail component)
    //    2.1) The small detail, which show only the important information
    //    2.2) The main detail page
    // 3) The dashboard should be a full map view
    // 4) The create should be the drawing view (full map view, no side) but overlay with the modal.
    return (
        <MasterDetail
            master={                
                <div className="master-container">        
                    <BlockList
                            handleSelect={handleSelect}
                        />
                    <BlockCreateButton
                        className="addnew"
                    />
                </div>
            }
            detail={
                <>
                    <Route
                        path={`${match.path}/:id([0-9]+)`}
                        exact
                        component={(props) => <Detail {...props}/>}
                    />
                    <Route 
                        path={`${match.path}`}
                        exact
                        component={(props) => <Dashboard {...props} />}
                    />
                </>
            }
        />
    )
}

BlockMapView.propTypes = {

}

export default BlockMapView
import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { useHistory } from "react-router-dom";
import { ROUTES } from 'routes'
import { ROUTE_MAP } from 'routes'

import { MenuButton } from 'components/Menu'

import './productiontopselector.scss'

const FixedMenuItems = ({
    onClose,
}) => {

    let history = useHistory()

    const handleDashboard = (e) => {
        onClose(e)
        const route = ROUTE_MAP[ROUTES.ProductionMultiView]
        history.push(route.toPath())
    }

    const handleNew = (e) => {
        onClose(e)
        const route = ROUTE_MAP[ROUTES.ProductionCreate]
        history.push(route.toPath())
    }

    return (
        <React.Fragment>
            <MenuItem 
                onClick={handleDashboard}
            >
                <DashboardIcon />
                <FormattedMessage {...messages.multiview} />
            </MenuItem>
            <Divider />
            <MenuItem 
                onClick={handleNew}
            >
                <AddBoxIcon />
                <FormattedMessage {...messages.create} />
            </MenuItem>
            <Divider />
        </React.Fragment>
    )
}

const CropMenuItem = ({
    id,
    title,
    onClose,
}) => {
    let history = useHistory()

    const handleClick = (e) => {
        onClose(e)
        const route = ROUTE_MAP[ROUTES.ProductionDetail]
        history.push(route.toPath({id}))
    }

    return (
        <MenuItem onClick={handleClick}>{title}</MenuItem>
    )
}

const ProductionTopSelector = ({
    className="production-selector"
}) => {

    const crops = [
        {id: 1, title: 'My wheat'},
        {id: 2, title: 'My corn'},
    ]

    

    return (
        <MenuButton
            title="Productions"
            className={className}
            componentProps={{
                variant: 'contained'
            }}
        >            
            <FixedMenuItems
            />
            { crops && crops.map((crop => (
                <CropMenuItem
                    key={`${crop.title}-${crop.id}`}
                    {...crop}
                    //onClick={(id) => console.log("Selected crop: ", id)}
                />
                )
            )) }
        </MenuButton>
    )
}

ProductionTopSelector.propTypes = {

}

export default ProductionTopSelector
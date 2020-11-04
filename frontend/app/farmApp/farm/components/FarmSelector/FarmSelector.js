import React from 'react'
import messages from './messages';
import { FormattedMessage } from 'react-intl';

import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { useHistory } from "react-router-dom";
import { ROUTES } from 'routes'
import { ROUTE_MAP } from 'routes'

import { MenuButton } from 'components/Menu'

import './farmselector.scss'

const FixedMenuItems = ({
    onClose,
}) => {

    let history = useHistory()

    const handleDashboard = (e) => {
        onClose(e)
        const route = ROUTE_MAP[ROUTES.FarmDashboard]
        history.push(route.toPath())
    }

    const handleNew = (e) => {
        onClose(e)
        const route = ROUTE_MAP[ROUTES.FarmCreate]
        history.push(route.toPath())
    }

    return (
        <React.Fragment>
            <MenuItem 
                onClick={handleDashboard}
            >
                <DashboardIcon />
                <FormattedMessage {...messages.multifarm} />
            </MenuItem>
            <Divider />
            <MenuItem 
                onClick={handleNew}
            >
                <AddBoxIcon />
                <FormattedMessage {...messages.newFarm} />
            </MenuItem>
            <Divider />
        </React.Fragment>
    )
}

const FarmsMenuItem = ({
    id,
    title,
    onClose,
    onClickFarm
}) => {

    const onClick = () => {
        onClose()
        onClickFarm(id)
    }

    return (
        <MenuItem onClick={onClick}>{title}</MenuItem>
    )
}

const FarmSelector = ({

}) => {

    const farms = [
        {id: 1, title: 'Farm 1'},
        {id: 2, title: 'Farm 2'},
    ]


    return (
        <MenuButton
            title="Selected Farm"
        >            
            <FixedMenuItems
            />
            { farms && farms.map((farm => (
                <FarmsMenuItem
                    key={`${farm.title}-${farm.id}`}
                    {...farm}
                    onClickFarm={(id) => console.log("Selected farm: ", id)}
                />
                )
            )) }
        </MenuButton>
    )
}

export default FarmSelector
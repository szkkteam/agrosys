import React from 'react'
import messages from 'farmApp/farm/messages';
import { FormattedMessage } from 'react-intl';

import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { useHistory } from "react-router-dom";
import { ROUTES } from 'routes'

import { MenuButton } from 'components/Menu'

import './farmselector.scss'

const FixedMenuItems = ({
    onClose,
}) => {

    const history = useHistory()

    const handleDashboard = () => {
        onClose()
        history.push(ROUTES.FarmDashboard)
    }

    const handleNew = () => {
        onClose()
        history.push(ROUTES.FarmCreate)
    }

    return (
        <React.Fragment>
            <MenuItem 
                onClick={handleDashboard}
            >
                <DashboardIcon />
                <FormattedMessage {...messages.multifarmView} />
            </MenuItem>
            <Divider />
            <MenuItem 
                onClick={handleNew}
            >
                <AddBoxIcon />
                <FormattedMessage {...messages.createNewFarm} />
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
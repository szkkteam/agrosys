import React from 'react'

import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardMedia from '@material-ui/core/CardMedia';

import { NavLink } from 'components'
import { ROUTES } from 'routes'

import './productionlistitem.scss'

export const ListElement = ( {item, ...props} ) => {
    const { title, fields } = item
    const { coverImage, area, value } = fields[0] 
    return (
        <React.Fragment>
            <NavLink strict exact to={ROUTES.FieldDetail} params={item}>
                <CardMedia
                        className={"field-cover"}
                        image={coverImage? coverImage : "https://via.placeholder.com/100/100"}
                        title="Whatever image name"
                /> 
            </NavLink>  
            <div 
                className={"field-title"}
            >
                <Typography component="h5" variant="h5">
                    {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Area: {area} m2
                </Typography>
            </div>        
        </React.Fragment>
    )
}

export const ListCreate = () => (
    <React.Fragment>
        <NavLink strict exact to={ROUTES.ProductionCreate} dataProps={{useAsTemplate: true}}>
            <AddCircleIcon 
                fontSize={"large"}
            />
        </NavLink>
        <div style={{display: "inline-block", marginLeft: "10px"}}>
            <Typography component="h5" variant="h5">
                Create New Template
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Click here to create a new production template.
            </Typography>
        </div>
    </React.Fragment>   
)

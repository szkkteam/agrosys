import React from 'react'

import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardMedia from '@material-ui/core/CardMedia';

import { NavLink } from 'components'
import { ROUTES } from 'routes'

export const FieldListElement = ( {item, ...props} ) => {
    const { title, fields } = item
    const { coverImage, area, value } = fields[0] 
    return (
        <React.Fragment>
            <NavLink strict exact to={ROUTES.FieldCreate}>
                { coverImage? 
                    <CardMedia
                            className={"field-cover"}
                            image={coverImage}
                            title="Whatever image name"
                    /> : 
                    "Image Placeholder" }                
            </NavLink>  
            <div style={{display: "inline-block"}}>
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

export const FieldListCreate = () => (
    <React.Fragment>
        <NavLink strict exact to={ROUTES.FieldCreate}>
            <AddCircleIcon 
                fontSize={"large"}
            />
        </NavLink>
        <div style={{display: "inline-block", marginLeft: "10px"}}>
            <Typography component="h5" variant="h5">
                Create New
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Click here to create a new field.
            </Typography>
        </div>
    </React.Fragment>   
)

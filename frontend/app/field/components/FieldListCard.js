import React from 'react'

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { NavLink } from 'components'

export default ({cardData, children}) => {
    const {title, description, route} = cardData
    return (
        <NavLink to={route}>
            <Card>
                <div className={"field-item"}>
                    { children }
                    <CardContent className="card-content" style={{display: "inline-block"}}>
                        <Typography component="h5" variant="h5">
                            {title}
                        </Typography>
                        {description && <Typography variant="subtitle1" color="textSecondary">
                            {description}
                        </Typography> }
                    </CardContent>
                </div>
            </Card>
        </NavLink>
    )
}
import React from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default ({title, description, children}) => {
    return (
        <Card>
            { children }
            <CardContent className="card-content">
                <Typography component="h5" variant="h5">
                    {title}
                </Typography>
                {description && <Typography variant="subtitle1" color="textSecondary">
                    {description}
                </Typography> }
            </CardContent>
        </Card>
    )
}
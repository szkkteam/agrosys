import React from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default ({children}) => {
    return (
        <Card>
            <div className={"field-item"}>
                <CardContent className="card-content">
                    { children }
                </CardContent>
            </div>
        </Card>
    ) 
}
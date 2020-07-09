import React from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default ({children}) => {
    return (
        <Card>
            <div className={"field-item"}>
                <CardContent className="card-content" style={{display: "inline-block"}}>
                    { children }
                </CardContent>
            </div>
        </Card>
    ) 
}
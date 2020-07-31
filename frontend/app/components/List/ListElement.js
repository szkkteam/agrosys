import React from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './list.scss'

export const ListElementSmall = ({children}) => {
    return (
        <Card>
            <div className={"list-item"}>
                <CardContent className="card-content" style={{display: "inline-block"}}>
                    { children }
                </CardContent>
            </div>
        </Card>
    ) 
}



export const ListElementLong = ({children}) => {
    return (
        <Card>
            <div className={"list-item"}>
                <CardContent className="card-content" style={{display: "inline-block"}}>
                    { children }
                </CardContent>
            </div>
        </Card>
    ) 
}
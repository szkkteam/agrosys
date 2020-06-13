import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import './listelements.scss'

export default class CardComponent extends React.Component {
    constructor() {
        super()
    }

    render() {
    
      return (
         <Card className="item-holder">
            <CardHeader
                className="item-header"                
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title="My Farm"
                subheader="Last modified: September 14, 2016"
            />
            <CardContent>
                <CardMedia
                    className="item-image"
                    image="https://via.placeholder.com/200x150"
                    title="My Farm"
                />                 
            </CardContent>
            <CardActions style={{position: "relative"}}>
                <Button variant="contained" size="small" color="primary">
                    Select
                </Button>
                <Button variant="contained" size="small" color="primary" className="item-button-right">
                    Edit
                </Button>
            </CardActions>
         </Card>
      )
    }
}
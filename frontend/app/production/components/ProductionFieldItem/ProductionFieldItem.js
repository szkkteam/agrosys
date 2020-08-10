import React, { useState } from 'react'
import classnames from 'classnames'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import './productionfielditem.scss'



export default ({field, onClick, ...props}) => {
    const [selected, setSelected] = useState(false);

    return (                
        <Card 
            className={classnames("item-holder", { selected })}
        >
            <div className="item-click"
                onClick={() => { selected? setSelected(false) : setSelected(true); onClick && onClick()}}
            >
                <CardHeader
                    className="item-header"                
                    title={field.title}
                />
                <CardContent>
                    <CardMedia
                        className="item-image"
                        image="https://via.placeholder.com/100x100"
                        title={field.title}
                    />                 
                </CardContent>
            </div>
            <CardActions style={{position: "relative"}}>
                
                {
                /* selected? 
                    <Button variant="contained" size="small" color="primary" onClick={() => setSelected(false)}>
                        Deselect
                    </Button>:
                    <Button variant="contained" size="small" color="primary" onClick={() => setSelected(true)}>
                        Select
                    </Button>
                    */
                }
                <Button 
                    style={{width: "100%"}}
                    size="large" 
                    color="primary" >
                    <ExpandMoreIcon
                        size="large"
                    />
                </Button>
            </CardActions>
        </Card>
    )
}

import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';


import CardComponent from './CardComponent'

export default class ListComponent extends React.Component {
    constructor() {
        super()
    }

    renderLeftArrow = () => {
      return (
        <IconButton aria-label="left" style={{position: "absolute", left: "10px", top: "50%"}} size="medium">
          <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>
      )
    }
      
    renderRightArrow = () => {
      return (
        <IconButton aria-label="right" style={{position: "absolute", right: "10px", top: "50%"}} size="medium">
          <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
      )
    }

    render() {
     
      return (
          <React.Fragment>
            {this.renderLeftArrow()}
            {this.renderRightArrow()}
            <Grid container direction="row" alignItems="center" justify="space-evenly">
              <CardComponent/>
            </Grid>
          </React.Fragment>
      )
    }
}
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
    TaskCalendar
} from 'task/components'


export default (props) => {
    const { 
        initialValues,
        onEdit,
        ...rest 
    } = props

    const { tasks = [], title, ...localInitialValues } = initialValues || {}

  return (      
    <div >
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField name="title"
                        label="Title of Template"
                        className="from-section"
                        variant="outlined"
                        defaultValue={title}
                        InputProps={{
                            readOnly: true,
                          }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TaskCalendar
                        disabled={true}
                        tasks={tasks}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                className="form-button-grp">
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                    <Button type="submit"
                        variant="contained"
                        color="primary" 
                        onClick={onEdit}
                    >
                        Edit
                    </Button>
                </Grid>
            </Grid>
      </Grid>     
    </div>
  ) 
}


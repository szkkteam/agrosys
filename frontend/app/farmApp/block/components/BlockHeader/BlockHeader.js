import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { VIEW_MAP, VIEW_LIST, VIEW_MODULE } from '../../constants'

const BlockHeader = ({
    history,
    match,

}) => {

    const handleMapView = () => {
        history.push(`${match.path}/?view=${VIEW_MAP}`)
    }

    const handleListView = () => {
        history.push(`${match.path}/?view=${VIEW_LIST}`)
    }

    const handleModuleView = () => {
        history.push(`${match.path}/?view=${VIEW_MODULE}`)
    }

    return (
        <Grid
            direction="row"
            container
            justify="flex-end"
            alignItems="center"
            spacing={1}
        >
            <Grid item xs={10}>

            </Grid>
            <Grid item xs={2}>
                <div style={{display: "inline-block", float: "right"}}>
                    <IconButton
                        onClick={handleMapView}
                    >
                        <MapIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleListView}
                    >
                        <ListIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleModuleView}
                    >
                        <ViewModuleIcon />
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    )
}

BlockHeader.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default BlockHeader
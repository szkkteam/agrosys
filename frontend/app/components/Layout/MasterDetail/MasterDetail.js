import React from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { withResizeAware } from 'utils/hoc'

import './masterdetail.scss'

const MasterDetail = ({
    master,
    detail,
    masterSize=3,
}) => {
    const detailSize = 12 - masterSize

    const paperProps = {
        variant: 'outlined',
        elevation: 1,
        square: false,
    }

    return (
        <Grid
            className="master-detail"
            container
            spacing={1}
        >
            <Grid item xs={masterSize} className="master">
                {master}
            </Grid>
            <Grid item xs={detailSize} className="detail">
                {detail}
            </Grid>
        </Grid>
    )
}

MasterDetail.propTypes = {
    masterSize: PropTypes.number,
    master: PropTypes.element.isRequired,
    detail: PropTypes.element.isRequired,
}

export default MasterDetail
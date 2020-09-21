import React from 'react'
import { compose, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { Spinner } from 'components/Loading'

import {
    getSelectedParcelSeasons,
} from 'production/selectors'


class ProductionCreateContainer extends React.Component {

    render() {
        const { parcelSeasons } = this.props

        console.log("parcelSeasons: ", parcelSeasons)
        return (
            <div>Hey, im a production</div>
        )
    }
}


const mapStateToProps = (state) => {
    const { data: parcelSeasons, ...rest } = getSelectedParcelSeasons(state)
    return {
        parcelSeasons,
        ...rest,
    }
}

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindRoutineCreators({ }, dispatch),
)


export default compose(    
    withConnect,
)(ProductionCreateContainer)
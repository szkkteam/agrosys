import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import {
    SplitButton
} from 'components/Button'

import {
    getAddButtonlist,
} from 'parcel/selectors'

const AddParcelButton = ({
    buttons,
    onParcelAdd,
}) => {
    return (
        <React.Fragment>
            {buttons && buttons.length && 
                <SplitButton 
                    options={buttons}
                    handleClick={onParcelAdd}
                />
            }
        </React.Fragment>
    )
}

const mapStateToProps = state => (
        {buttons: getAddButtonlist(state) }
)

const withConnect = connect(
    mapStateToProps,
    null,
)

export default compose(
  withConnect,
)(AddParcelButton)


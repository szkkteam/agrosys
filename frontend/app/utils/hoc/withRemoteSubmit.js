import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

const withRemoteSubmit = (WrappedComponenet, formName) => {
    class RemoteSubmit extends React.Component {

        onSubmit = () => {
            const { dispatch } = this.props
            dispatch(submit(formName))
        }

        render () {
            return (
                <WrappedComponenet
                    onSubmit={this.onSubmit}
                    {...this.props} 
                />
            )
        }
    }
    return connect()(RemoteSubmit)
}

export default withRemoteSubmit
import React from 'react'
import { PageContent } from 'components'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { bindRoutineCreators } from 'actions'
import { injectReducer, injectSagas } from 'utils/async'

import { loadFieldDetail } from 'field/actions'
import { selectFieldDetailById } from 'field/reducers/fieldDetail'

import { FieldDetailLayout } from 'field/components'

class FieldDetail extends React.Component {

    componentWillMount() {
        const { loadFieldDetail, id } = this.props
        loadFieldDetail.maybeTrigger({ id })
    }

    componentWillReceiveProps(nextProps) {
        const { loadFieldDetail, id } = nextProps
        if (id != this.props.id) {
            loadFieldDetail.maybeTrigger({ id })
        }
    }

    render() {
        const { isLoaded, field } = this.props
        if ( !isLoaded ) {
            return null
        }
        return (
            <PageContent>
                <Helmet>
                    <title>
                        Field - title
                    </title>
                </Helmet>
                <FieldDetailLayout
                    field={field}
                />
                {field.title}
            </PageContent>
        )
    }
}

const withReducer = injectReducer(require('field/reducers/fieldDetail'))
const withSagas = injectSagas(require('field/sagas/fieldDetail'))

const withConnect = connect(
  (state, props) => {
    const id = props.match.params.id
    const field = selectFieldDetailById(state, id)
    return {
      id,
      field,
      isLoaded: !!field,
    }
  },
  (dispatch) => bindRoutineCreators({ loadFieldDetail }, dispatch),
)

export default compose(
    withReducer,
    withSagas,
    withConnect,
  )(FieldDetail)
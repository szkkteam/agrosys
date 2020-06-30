import React from 'react'
import { PageContent } from 'components'
import Helmet from 'react-helmet'


export default class FieldDetail extends React.Component {

    componentWillMount() {
        const { id } = this.props
        //TODO: Fetch data based on "id"
    }

    render() {
        return (
            <PageContent>
                <Helmet>
                    <title>
                        Field - title
                    </title>
                </Helmet>
                Im a field detail
            </PageContent>
        )
    }
}
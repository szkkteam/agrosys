import React from 'react'
import { PageContent } from 'components'


export default class FieldDetail extends React.Component {

    componentWillMount() {
        const { id } = this.props
        //TODO: Fetch data based on "id"
    }

    render() {
        retrun (
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
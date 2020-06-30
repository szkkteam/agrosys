import React from 'react'

import { PageContent } from 'components'
import Helmet from 'react-helmet'

import './farmcreate.scss'

export default class FarmCreate extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }

    render() {
        return (
            <PageContent>
                <Helmet>
                    <title>
                        Farm - Create
                    </title>
                </Helmet>
                
            </PageContent>
        )
    }
}
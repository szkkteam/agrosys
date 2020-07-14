import React from 'react'
import { PageContent } from 'components'
import Helmet from 'react-helmet'


import { FieldDraw } from 'field/components'

export default class FieldCreate extends React.Component { 
 
    render() {
        return (
            <PageContent>
                <Helmet>
                    <title>
                        Field - New
                    </title>
                    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                </Helmet>
                <FieldDraw />
            </PageContent>
        )
    }
}

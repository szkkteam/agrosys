import React from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Carousel from '@brainhubeu/react-carousel';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {
    ProductionFieldItem
} from 'production/components'

import './productionfieldassigment.scss'
import '@brainhubeu/react-carousel/lib/style.css';

export default class ProductionFieldAssigment extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isExtended: false,
        }
    }

    render() {
        const { fields} = this.props
        const { isExtended } = this.state
        return (
        <div>
            <Carousel 
                arrows
                centered={true}
                slidesPerPage={8}
                slidesPerScroll={1}
            >
                { fields && Array.isArray(fields) && fields.map((field, i) => {
                    console.log("ProductionFieldItem: ", ProductionFieldItem)
                    return (
                        <ProductionFieldItem
                            key={i}
                            field={field}
                        />
                    )
                })

                }
            </Carousel>
        </div>
        )
    }
}
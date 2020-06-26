import React from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';

import FiledListCard from './FieldListCard'

import './fieldlistviewelement.scss'

class FieldListElementBase extends React.Component {

    render() {
        const { children, ...rest} = this.props;
        return (
            <Paper elevation={3}>
                <FiledListCard
                    cardData={...rest}
                >
                    { children }
                </FiledListCard>
            </Paper>
        )
    }
}

export const FieldListElement = ( {coverImage, ...rest} ) => (
        <FieldListElementBase
            { ...rest }
        >
            <CardMedia
                    className={"field-cover"}
                    image={coverImage}
                    title="Whatever image name"
                />
        </FieldListElementBase>            
)


export const FieldListCreate = () => (
    <FieldListElementBase
        title={"Create New"}
    >
    </FieldListElementBase>            
)

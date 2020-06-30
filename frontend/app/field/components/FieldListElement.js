import React from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardMedia from '@material-ui/core/CardMedia';

import { ROUTES } from 'routes'
import FieldListCard from './FieldListCard'


class FieldListElementBase extends React.Component {

    render() {
        const { children, ...rest} = this.props;
        return (
            <React.Fragment>
                <FieldListCard
                    cardData={rest}
                >
                    { children }
                </FieldListCard>
            </React.Fragment>
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
        description={"Click here to create a new field."}
        route={ROUTES.FieldCreate}        
    >
        <AddCircleIcon />
    </FieldListElementBase>             
)

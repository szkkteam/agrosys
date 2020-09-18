import React from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export default ({
    title,
    onEdit,
    ...props
}) => {
    return (
        <ButtonGroup className="map-edit-btn" variant="contained" color="primary">
            <Button
                color="primary"
                size="small"
                onClick={onEdit}
                {...props}
            >
                Edit {title}
            </Button>
        </ButtonGroup>
    )
}
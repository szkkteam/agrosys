import React from 'react'
import Button from '@material-ui/core/Button';

export default ({
    title,
    ...props
}) => {
    return (
        <Button
            color="primary"
            size="small"
            {...props}
        >
            Edit
        </Button>
    )
}
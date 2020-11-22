import React from 'react'
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { useHistory } from "react-router-dom";

export default ({
    title,
    redirect=null,
}) => {

    let history = useHistory()

    const onClick = () => {
        redirect && history.push(redirect)
    }

    return (
        <Button
            disabled={redirect === null}
            onClick={onClick}
            variant="contained"
        >
            <ArrowLeftIcon />
            <span>
                {title}    
            </span>
        </Button>
    )
}
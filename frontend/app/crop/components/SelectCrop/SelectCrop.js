import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import './selectcrop.scss'

export default ({items, onChange, id, label, disabled = false, helper, ...props}) => (
    <FormControl className={"crop-select-form"}
        disabled={disabled}
    >
        <InputLabel id={id}>{label}</InputLabel>
        <Select
            labelId={id}
            onChange={onChange}
            {...props}
            >
                { items && Array.isArray(items) && items.map((item, index) => (
                    <MenuItem 
                        key={index} 
                        value={item.id}
                    >
                        {item.title}
                    </MenuItem>    
                ))}
        </Select>
        <FormHelperText>{helper}</FormHelperText>
    </FormControl>
)
import React from 'react'
import styled from 'styled-components'
import TextField from './TextField'

const FixedWidthField = styled(TextField)`
    max-width: 100px;
`

export default ({
  ...props
}) => {

    return (
      <FixedWidthField
        {...props}
        fullWidth
        inputProps={{
            type: "number"
        }}
      />
    )
}
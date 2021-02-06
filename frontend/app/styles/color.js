import styled , { css } from 'styled-components'
import { fade } from '@material-ui/core/styles/colorManipulator';

export const PrimaryBackground = css`
    ${({theme}) => `
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};
    `}
`

export const PrimaryCardHeader = css`
    ${PrimaryBackground}
    ${({theme}) => `
        & .MuiCardHeader-subheader {
            color: ${fade(theme.palette.primary.contrastText, 0.64)};
        }
        & .MuiIconButton-root {
            color: ${fade(theme.palette.primary.contrastText, 1)};
        }
    `}

`
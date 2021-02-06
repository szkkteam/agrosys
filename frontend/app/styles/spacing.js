import styled , { css } from 'styled-components'
import { fade } from '@material-ui/core/styles/colorManipulator';

export const Padding = css`
    ${({theme, spacing=0}) => `
        ${Array.isArray(spacing)? `
        padding: ${theme.spacing(spacing[0])}px ${theme.spacing(spacing[1])}px;
        `: `
        padding: ${theme.spacing(spacing)}px;
        `} 
        ${theme.breakpoints.down('xs')} {
            padding-left: 0px;
            padding-right: 0px;
        }
    `}
`


export const Margin = css`
    ${({theme, margin=0}) => `
        ${Array.isArray(margin)? `
        margin: ${theme.spacing(margin[0])}px ${theme.spacing(margin[1])}px;
        `: `
        margin: ${theme.spacing(margin)}px;
        `} 
        ${theme.breakpoints.down('xs')} {
            margin-left: 0px;
            margin-right: 0px;
        }
    `}
`

export const Spacing = css`
    ${Padding}
    ${Margin}
`
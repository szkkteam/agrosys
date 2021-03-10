import { useSelector } from 'react-redux'
import { getTooltipOverlay } from '../selectors'

export default () => {
    return useSelector(getTooltipOverlay)
}
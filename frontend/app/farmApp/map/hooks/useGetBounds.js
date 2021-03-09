import { useSelector } from 'react-redux'
import { getBounds } from '../selectors'

export default () => {
    return useSelector(getBounds)
}
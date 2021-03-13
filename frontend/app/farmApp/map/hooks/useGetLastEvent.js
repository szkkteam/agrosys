import { useSelector } from 'react-redux'
import { getLastEvent } from '../selectors'

export default () => {
    return useSelector(getLastEvent)
}
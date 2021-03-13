import { useDispatch } from 'react-redux'
import { mapEventClear} from '../actions'

export default () => {
    const dispatch = useDispatch()

    return () => {
        dispatch(mapEventClear())
    }
}
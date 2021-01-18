import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useModalContext } from 'components/Modal/hooks'

export default () => {
    const history = useHistory()
    const {
        handleCancel,
    } = useModalContext()
    /* TODO: This is not working
        That looks better: https://codesandbox.io/s/n74l8jpv6p?file=/src/Users.js
    useEffect(() => {
        history.listen((location, e) => {
            console.debug("Location: ", location)
            console.debug("E: ",  e)
            let unblock = history.block(tx => {
                handleCancel()

            })
            unblock()
            
        })
    }, [history])
    */
}
import reducer from '../notification'
import {
    enqueueNotification,
    closeNotification,
    removeNotification,
} from '../../actions'

describe('notification reducer test', () => {

    it ('reducer initial state', () => {
        expect(reducer(undefined, {})
        ).toEqual({
            notifications: [], 
        })
    })

    it ('enqueueNotification action test', () => {
        const fixture = {
            message: 'Well done.',
            options: {
                key: 1,
                variant: 'info',        
            },
        }
        expect(reducer(undefined, enqueueNotification(fixture))
        ).toEqual({
            notifications: [{...fixture, key: 1}],
        })
    })

    it ('closeNotification action test', () => {
        const fixture = {
            message: 'Well done.',
            options: {
                key: 1,
                variant: 'info',        
            },
        }
        expect(reducer({notifications: [{...fixture, key: 1}]}, closeNotification(fixture))
        ).toEqual({
            notifications: [{...fixture, key: 1}],
        })
    })

    it ('closeNotification dismissAll action test', () => {
        const fixture = {
            message: 'Well done.',
            options: {
                key: 1,
                variant: 'info',        
            },
        }
        expect(reducer({notifications: [{...fixture, key: 1}]}, closeNotification(1))
        ).toEqual({
            notifications: [{...fixture, key: 1, dismissed: true}],
        })
    })

    it ('removeNotification action test', () => {
        const fixture = {
            message: 'Well done.',
            options: {
                key: 1,
                variant: 'info',        
            },
        }
        expect(reducer({notifications: [{...fixture, key: 1}]}, removeNotification(1))
        ).toEqual({
            notifications: [],
        })
    })

    
})
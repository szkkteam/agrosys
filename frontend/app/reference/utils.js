
import {
    parcelTypesEnum
} from 'reference/constants'


export const getAvailableTypes = (parcelTypes, storeData = null, filter = null) => {
    // Go trough on the parcel types which are available for this country
    const result = parcelTypes.reduce((collection, parcelType) => {
        let item = { data: parcelType }
        console.log("Filter: ", filter)
        if (filter && typeof filter === "function" && !filter(item.data)) {
            return collection    
        }        
        if (storeData) {
            item = Object.assign( item, storeData(item.data) )
        }      
        collection.push(item)  
        return collection
    }, [])

    return result
}
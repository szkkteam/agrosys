
export const ungroupParentParcels = (parcelList) => {
    const clearedParcels = parcelList.map(p => ({
        ...p,
        parcels: [],
    }))

    const groupFixed = clearedParcels.reduce((accu, parcel) => {
        // If this was a child parcel, find it's parent
        if ('parentParcelId' in parcel) {
            clearedParcels.forEach(parent => {
                if (parcel.parentParcelId == parent.id) {
                    parent.parcels.push(parcel)
                }
            })
        } else {
            accu.push(parcel)
        }
        return accu
        
    }, [])
    return convertReferenceParcels(groupFixed)
}   

export const convertReferenceParcels = (parcelList) => {
    return parcelList.map((parcel, id) => (
        {
            ancestorId: parcel.id,
            referenceParcelType: parcel.referenceParcelType,
            geometry: parcel.geometry,
            title: parcel.title,
            notes: parcel.notes,
            eligibleArea: parcel.eligibleArea,
            totalArea: parcel.totalArea,
            soilTypeId: parcel.soilType.id,
            agriculturalTypeId: parcel.agriculturalType.id,
            parcels: parcel.parcels.length? convertReferenceParcels(parcel.parcels) : []
        }
    ))
}

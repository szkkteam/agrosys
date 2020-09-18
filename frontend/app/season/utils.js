
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

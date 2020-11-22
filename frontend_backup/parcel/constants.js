export const PARCEL_SELECT = "parcel/SELECT_PARCEL";

export const FORM_PARCEL = 'formParcel'

export const parcelTypesEnum = {
    AGRICULTURAL_PARCEL: "AgriculturalParcel",
    CADASTRAL_PARCEL: "CadastralParcel",
    FARMERS_BLOCK: "FarmersBlock",
    PHYSICAL_BLOCK: "PhysicalBlock",
    UNKOWN: "NotValid",
}

export const agriculturalParcelType = {
    type: "item",
    title: "Add Agricultural Parcel",
    initialValues: {
        referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL,
    }
}

const cadastralParcelType = {
    type: "item",
    title: "Add Cadastral Parcel",
    initialValues: {
        referenceParcelType: parcelTypesEnum.CADASTRAL_PARCEL,
    }
}

const farmersBlockType = {
    type: "item",
    title: "Add Farmer's Block",
    initialValues: {
        referenceParcelType: parcelTypesEnum.FARMERS_BLOCK,
    }
}

export const physicalBlockType = {
    type: "item",
    title: "Add Physical Block",
    initialValues: {
        referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK,
    }
}

const dividerType = {
    type: "divider"
}

const addButtonMap = {
    // TODO: Country specific lookup
    [parcelTypesEnum.AGRICULTURAL_PARCEL]: [],
    [parcelTypesEnum.CADASTRAL_PARCEL]: [agriculturalParcelType, ],
    [parcelTypesEnum.FARMERS_BLOCK]: [agriculturalParcelType, ],
    [parcelTypesEnum.PHYSICAL_BLOCK]: [agriculturalParcelType, ],
    [parcelTypesEnum.UNKOWN]: [physicalBlockType]
}

export const getButtonsByMap = (selectedObject) => {
    console.log("selectedObject: ", selectedObject)
    let selector = (selectedObject && selectedObject.referenceParcelType)? selectedObject.referenceParcelType : parcelTypesEnum.UNKOWN
    return addButtonMap[selector]
}

export const agriculturalTypePropsLookup = (typeId) => {
    switch(typeId) {
        case 1:
            return {color: "yellow"}
        case 2:
            return {color: "green"}
        case 3:
            return {color: "brown"}
        default:
            return {}
    }
}
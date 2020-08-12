import React from 'react';

import { SelectComponent, SelectOption } from 'components/Form'

import './selectcrop.scss'


const renderItems = (items) => (
    items && Array.isArray(items) && items.map((item, index) => (
        <SelectOption 
            key={index} 
            value={item.id}
        >
            {item.title}
        </SelectOption>    
    ))
)

export default ({
    crops,
    variants,
    cultivationTypes,
    productions,
    selectedCropId,
    selectedVariantId,
    selectedCultivationTypeId,
    selectedProductionId,
    onCropSelected,
    onVariantSelected,
    onCultivationTypeSelected,
    onProductionSelected,
    onClick
}) => {    
    return (
        <div>
            <div>
                <SelectComponent
                    name="crop"
                    label="Select a crop"
                    formProps={{className: "crop-select-form"}}
                    value={selectedCropId? selectedCropId : ""}
                    onChange={onCropSelected}
                >
                    { renderItems(crops) }
                </SelectComponent>                                    
                <SelectComponent
                    disabled={ selectedCropId && variants.length? false: true }
                    label="Select a variant"
                    helper="Select a crop first"
                    formProps={{className: "crop-select-form"}}
                    value={selectedVariantId? selectedVariantId : ""}
                    onChange={onVariantSelected}
                >
                    { renderItems(variants) }
                </SelectComponent>
                <SelectComponent
                    disabled={ selectedVariantId && cultivationTypes.length? false: true }
                    label="Select a cultivation type"
                    helper="Select a crop variant first"
                    formProps={{className: "crop-select-form"}}
                    value={selectedCultivationTypeId? selectedCultivationTypeId : ""}
                    onChange={onCultivationTypeSelected}
                >
                    { renderItems(cultivationTypes) }
                </SelectComponent>
            </div>
            <div>
                <SelectComponent
                    disabled={ productions.length? false: true }
                    label="Select a production"
                    helper="Select a crop template first"
                    formProps={{className: "crop-select-form"}}
                    value={selectedProductionId? selectedProductionId : ""}
                    onChange={onProductionSelected}
                >
                    { renderItems(productions) }
                </SelectComponent>
                <button disabled={selectedCultivationTypeId == null}
                    onClick={onClick}
                >
                    Create New
                </button>

            </div>
        </div>
    )
}
import { ORM } from "redux-orm";
import { CropType, UserCrop } from './cropProduction/crop/models'
//import { Season } from 'season/models'
//import { Farm } from 'farm/models'

const orm = new ORM({
    stateSelector: state => state.entities,
});

orm.register(
    CropType,
    UserCrop,
    //Farm,
    //Season,
    //ReferenceParcel,
    //PhysicalBlock,
    //FarmersBlock,
    //AgriculturalParcel
)

export default orm;
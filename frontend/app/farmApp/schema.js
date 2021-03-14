import { ORM } from "redux-orm";
import { CropType } from './product/crop/models'
import { Field } from './resource/field/models'
import { CropPlan } from './plan/cropPlan/models'

//import { Season } from 'season/models'
//import { Farm } from 'farm/models'

const orm = new ORM({
    stateSelector: state => state.entities,
});

orm.register(
    Field,
    CropType,
    CropPlan,
    //Farm,
    //Season,
    //ReferenceParcel,
    //PhysicalBlock,
    //FarmersBlock,
    //AgriculturalParcel
)

export default orm;
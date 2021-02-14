import { ORM } from "redux-orm";
import { CropType, UserCrop } from './cropProduction/crop/models'
import { Field } from './resource/field/models'
import { Season } from './cropProduction/season/models'
import { Production } from './cropProduction/production/models'
import { FieldProduction } from './cropProduction/fieldProduction/models'

//import { Season } from 'season/models'
//import { Farm } from 'farm/models'

const orm = new ORM({
    stateSelector: state => state.entities,
});

orm.register(
    Field,
    CropType,
    UserCrop,
    Season,
    Production,
    FieldProduction,
    //Farm,
    //Season,
    //ReferenceParcel,
    //PhysicalBlock,
    //FarmersBlock,
    //AgriculturalParcel
)

export default orm;
import { ORM } from "redux-orm";
import { ReferenceParcel } from 'parcel/models'
import { Season } from 'season/models'
import { Farm } from 'farm/models'

const orm = new ORM({
    stateSelector: state => state.entities,
});

orm.register(
    Farm,
    Season,
    ReferenceParcel,
    //PhysicalBlock,
    //FarmersBlock,
    //AgriculturalParcel
)

export default orm;
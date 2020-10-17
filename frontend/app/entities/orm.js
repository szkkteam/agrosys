import { ORM } from "redux-orm";
import { PhysicalBlock, AgriculturalParcel } from 'parcel/models'
import { Season } from 'season/models'
import { Farm } from 'farm/models'

const orm = new ORM({
    stateSelector: state => state.entities,
});

orm.register(
    Farm,
    Season,
    PhysicalBlock,
    AgriculturalParcel
)

export default orm;
import { ORM } from "redux-orm";
import { PhysicalBlock, AgriculturalParcel } from 'parcel/models'

const orm = new ORM({
    stateSelector: state => state.entities,
});

orm.register(
    PhysicalBlock,
    AgriculturalParcel
)

export default orm;
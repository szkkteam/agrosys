import orm from 'farmApp/schema'

describe('Test ield model', () => {
    // This will be the initial state.
    let state
    // This will be a Session instance with the initial data.
    let session

    beforeEach(done => {
        state = orm.getEmptyState()
        session = orm.mutableSession(state)

        done()
    })

    it('parse simple from json', () => {
        const fixture = {id: 1, title: "Tábla 1", area: 21000, geometry: {}, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"}

        const { Field } = session
        Field.parse(fixture)
        
        expect(Field.count()).toEqual(1)     
    
    })
    /*
    it('parse season with mixed types', () => {
        const farm = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.FARMERS_BLOCK }
        const parcel = { id: 2, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }
        const physical = { id: 3, title: 'random title', referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK }
        const parcels = [farm, parcel, physical]
        const fixture = { id: 1, title: 'random title', parcels }

        const { Season, ReferenceParcel } = session
        Season.parse(fixture)
        expect(ReferenceParcel.count()).toEqual(3)        
    })

    it('parse multiple season with mixed types', () => {
        const farm = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.FARMERS_BLOCK }
        const parcel = { id: 2, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }
        const physical = { id: 3, title: 'random title', referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK }
        const parcels1 = [parcel]
        const parcels2 = [farm, physical]
        const fixtures = [
            { id: 1, title: 'Season 1', parcels: parcels1 },
            { id: 2, title: 'Season 2', parcels: parcels2 },
        ]

        const currentSeason = 1
        const { Season, ReferenceParcel } = session
        fixtures.forEach(fixture => Season.parse(fixture))        
        const parcels = ReferenceParcel.filter({season: currentSeason}).count()
        expect(parcels).toEqual(1)
    })
    */
})

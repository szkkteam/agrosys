import orm from 'farmApp/schema'


const aloisTieberGeom = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                15.80683171749115,
                47.0677724300821
              ],
              [
                15.806558132171629,
                47.067122035283184
              ],
              [
                15.807357430458067,
                47.0668699138166
              ],
              [
                15.807212591171263,
                47.06642413091398
              ],
              [
                15.80828547477722,
                47.066442400778335
              ],
              [
                15.808795094490051,
                47.06647163254827
              ],
              [
                15.809036493301392,
                47.06707088029944
              ],
              [
                15.808634161949158,
                47.06743261805917
              ],
              [
                15.807738304138184,
                47.06752031169185
              ],
              [
                15.807239413261414,
                47.06764089020118
              ],
              [
                15.80683171749115,
                47.0677724300821
              ]
            ]
          ]
        }
      }
    ]
}
/**
 * Field fixtures
 */
const field_table1 = 
    {id: 1, title: "Tábla 1", area: 21000, geometry: aloisTieberGeom, lpis: { ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"}}



const production_fixture = { id: 1, fields: [{ id: 1, fieldId: field_table1.id}, ], productionType: 'mainCropProduction' }

const season_fixture = 
    {id: 1, title: 'Búza 2020', productions: [ production_fixture ] }

const fields = [field_table1]
const seasons = [season_fixture]

const loadFixtures = (session) => {
    const { Field, Season } = session
    fields.map(field => Field.parse(field))
    seasons.map(season => Season.parse(season))

}

describe('Test season model', () => {
    // This will be the initial state.
    let state
    // This will be a Session instance with the initial data.
    let session

    beforeEach(done => {
        state = orm.getEmptyState()
        session = orm.mutableSession(state)

        loadFixtures(session)
        done()
    })

    it('parse simple from json', () => {

        const { Production, Season } = session

        //expect(UserCrop.count()).toEqual(1)     
        expect(Season.count()).toEqual(1)
        expect(Production.count()).toEqual(1)
    

    })

    it('season should have production', () => {
        const { Production, Season } = session
        expect(Production.filter({id: season_fixture.id}).count()).toEqual(1)
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

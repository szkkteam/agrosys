
export const aloisTieberGeom = {
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
export const field_table1 = 
    {id: 1, title: "Tábla 1", area: 21000, geometry: aloisTieberGeom, lpis: { ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"}}


/**
 * CropType fixtures
 */
export const cropType_winterWheat = 
    {id: 1, title: "Téli búza", category: "Takarmány növény"}
export const cropType_springWheat =
    {id: 2, title: "Tavaszi búza", category: "Takarmány növény"}
export const cropType_corn =
    {id: 3, title: "Kukorica", category: "Takarmány növény"}
export const cropType_canola = 
    {id: 4, title: "Repce", category: "Takarmány növény"}



/**
 * FieldProduction fixtures
 */
export const fieldProduction_wheat2020_mainCrop_field_table1 = 
  { id: 1, field: field_table1, /*TODO: Crop ,variant, yield, etc? */ }

/**
 * Production fixtures
 */
export const production_wheat2020_mainCrop =
  { id: 1, fields: [fieldProduction_wheat2020_mainCrop_field_table1, ], productionType: '' }

/**
 * Season fixtures
 */
export const season_wheat2020 = 
    {id: 1, title: 'Búza 2020', /* userCrop: userCrop_wheat, */ productions: [ production_wheat2020_mainCrop ] }

/**
 * UserCrop fixtures
 */
export const userCrop_wheat = 
    {id: 1, title: "Búza", cropType: cropType_winterWheat, seasons: [season_wheat2020]}



/**
 * Api fetch
 */
export const userCrops = [
    userCrop_wheat
]

export const seasons = [
  season_wheat2020
]

export const cropTypes = [
    cropType_winterWheat,
    cropType_springWheat,
    cropType_corn,
    cropType_canola
]

export const fields = [
    field_table1
]
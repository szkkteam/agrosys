import { schema } from '../schema'
import { syncValidator } from 'utils/validator'
import messages from '../messages'

describe('Validate FieldCreateDraw form', () => {
    
    let validator
    const geometry = {
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

    beforeEach(() => {
        validator = syncValidator(schema)
       
    });

    it('validation pass', () => {
                
        const fixture = {fields: [
            {title: "Tábla 1", area: 21000, geometry, lpis: { ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"}},
        ]}        

        const result = validator(fixture)
        expect(result).toEqual({})
    })

    it('missing area', () => {
                
        const fixture = {fields: [
            {title: "Tábla 1", geometry, lpis: { ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"}},
        ]}        

        const result = validator(fixture)
        expect(result).toEqual({"fields[0].area": messages.areaMissing})
    })
    
})

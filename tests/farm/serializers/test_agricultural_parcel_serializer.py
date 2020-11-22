#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import ReferenceParcelSerializer, ReferenceParcelListSerializer
from .. import get_input_data

VALID_SOIL_TYPE = 1

PARCEL_TYPE = 'AgriculturalParcel'

VALID_GEOJSON = {"type": "Feature",
                 "properties": {},
                 "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[17.71719217300415,47.12809671910988],[17.721483707427975,47.1230306334327],[17.725925445556637, 47.12485564784686
                        ],[17.723522186279297,47.12732296778955],[17.721827030181885,47.12662220216394],[17.71946668624878,47.12919163099024],
                        [17.71719217300415,47.12809671910988]]]
                  }
    }

LONG_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "


VALID_INPUT_DATA = [
    ({'title': 'test field 1', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, }),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 999.0,  }),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 1.0,  }),
    ({'title': 'test field #$!"1', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 1.0,  }),
]

VALID_INPUT_DATA_LIST = [
    [({'title': 'test field 1', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0,  }),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 999.0,  }),],
    [({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 1.0,  }),
    ({'title': 'test field #$!"1', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 1.0,  }),]
]


INVALID_INPUT_DATA = [
    #({'title': None, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 1.5, 'soilTypeId': VALID_SOIL_TYPE }, 'Field may not be null.', 'title'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': None, 'totalArea': 2.0, }, 'Field may not be null.', 'geometry'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': None,  }, 'Field may not be null.', 'totalArea'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 0,  }, 'Field may not be 0 or less.', 'totalArea'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': -100,  }, 'Field may not be 0 or less.', 'totalArea'),
]

INVALID_INPUT_DATA_LIST = [
    #([{'title': None, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 1.5, 'soilTypeId': VALID_SOIL_TYPE }], 'Field may not be null.', 'title'),
    ([{'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': None, 'totalArea': 2.0,  }], 'Field may not be null.', 'geometry'),
    ([{'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': None, }], 'Field may not be null.', 'totalArea'),
]


class TestAgriculturalParcelSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        serializer = ReferenceParcelSerializer()
        serializer.load(copy.deepcopy(get_input_data(input)))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        serializer = ReferenceParcelSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input)))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        serializer = ReferenceParcelSerializer()
        d = get_input_data(input)
        result = serializer.load(d)
        result = serializer.dump(result)
        print("result: ", result)
        assert result['title'] == d['title']
        #assert result['referenceParcelType']['id'] == d['referenceParcelTypeId']
        #assert result['soilType']['id'] == d['soilTypeId']


class TestAgriculturalParcelListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        serializer = ReferenceParcelListSerializer()
        serializer.load(copy.deepcopy(get_input_data(input)), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        serializer = ReferenceParcelListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input)), many=True)

    @pytest.mark.skip(reason="Updateting the ID of soil and parcel type is not working here.")
    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = ReferenceParcelListSerializer()
        result = serializer.load(get_input_data(input), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']
            #assert r['referenceParcelType']['id'] == i['referenceParcelTypeId']
            #assert r['soilType']['id'] == i['soilTypeId']
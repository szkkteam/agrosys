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

PARCEL_TYPE = 'PhysicalBlock'

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
    ({'title': 'test field 1', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 1.5, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 999.0, 'eligibleArea': 999.0, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 1.0, 'eligibleArea': 0.999, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }),
    ({'title': 'test field #$!"1', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 1.0, 'eligibleArea': 0.5, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }),
]

VALID_INPUT_DATA_LIST = [
    [({'title': 'test field 1', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 1.5, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 999.0, 'eligibleArea': 999.0, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }),],
    [({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 1.0, 'eligibleArea': 0.999, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }),
    ({'title': 'test field #$!"1', 'referenceParcelType': PARCEL_TYPE, 'notes': None, 'geometry': VALID_GEOJSON, 'totalArea': 1.0, 'eligibleArea': 0.5, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }),]
]


INVALID_INPUT_DATA = [
    #({'title': None, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 1.5, 'soilTypeId': VALID_SOIL_TYPE }, 'Field may not be null.', 'title'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': None, 'totalArea': 2.0, 'eligibleArea': 1.5, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }, 'Field may not be null.', 'geometry'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': None, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }, 'Field may not be null.', 'eligibleArea'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': None, 'eligibleArea': 2.0, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }, 'Field may not be null.', 'totalArea'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 2.1, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }, 'Field may be not bigger than totalArea.', 'eligibleArea'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 0, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }, 'Field may not be 0 or less.', 'eligibleArea'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': -100, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }, 'Field may not be 0 or less.', 'eligibleArea'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 2.0, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': None }, 'Field may not be null.', 'soilTypeId'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 2.0, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': 999 }, 'ID 999 does not exist.', 'soilTypeId'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 2.0, 'soilTypeId': lambda v,t: v.id, 'agriculturalTypeId': None }, 'Field may not be null.', 'agriculturalTypeId'),
    ({'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 2.0, 'soilTypeId': lambda v,t: v.id, 'agriculturalTypeId': 999 }, 'ID 999 does not exist.', 'agriculturalTypeId'),
]

INVALID_INPUT_DATA_LIST = [
    #([{'title': None, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': 1.5, 'soilTypeId': VALID_SOIL_TYPE }], 'Field may not be null.', 'title'),
    ([{'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': None, 'totalArea': 2.0, 'eligibleArea': 1.5, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }], 'Field may not be null.', 'geometry'),
    ([{'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': 2.0, 'eligibleArea': None, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }], 'Field may not be null.', 'eligibleArea'),
    ([{'title': 'test field 2', 'referenceParcelType': PARCEL_TYPE, 'notes': LONG_TEXT, 'geometry': VALID_GEOJSON, 'totalArea': None, 'eligibleArea': 2.0, 'agriculturalTypeId': lambda v,t: t.id, 'soilTypeId': lambda v,t: v.id }], 'Field may not be null.', 'totalArea'),
]

class TestPhysicalBlockSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input, soil, agri_type):
        serializer = ReferenceParcelSerializer()
        serializer.load(copy.deepcopy(get_input_data(input, soil, agri_type)))

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field, soil, agri_type):
        serializer = ReferenceParcelSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input, soil, agri_type)))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input, soil, agri_type):
        serializer = ReferenceParcelSerializer()
        d = get_input_data(input, soil, agri_type)
        result = serializer.load(d)
        result = serializer.dump(result)
        print("result: ", result)
        assert result['title'] == d['title']
        #assert result['referenceParcelType']['id'] == d['referenceParcelTypeId']
        #assert result['soilType']['id'] == d['soilTypeId']


class TestPhysicalBlockListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input, soil, agri_type):
        serializer = ReferenceParcelListSerializer()
        serializer.load(copy.deepcopy(get_input_data(input, soil, agri_type)), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field, soil, agri_type):
        serializer = ReferenceParcelListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(get_input_data(input, soil, agri_type)), many=True)

    @pytest.mark.skip(reason="Updateting the ID of soil and parcel type is not working here.")
    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input, soil, agri_type):
        input_data = copy.deepcopy(input)

        serializer = ReferenceParcelListSerializer()
        result = serializer.load(get_input_data(input, soil, agri_type), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']
            #assert r['referenceParcelType']['id'] == i['referenceParcelTypeId']
            #assert r['soilType']['id'] == i['soilTypeId']
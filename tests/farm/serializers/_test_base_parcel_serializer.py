#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Common Python library imports
import copy

# Pip package imports
import pytest
from marshmallow.exceptions import ValidationError

# Internal package imports
from backend.farm.serializers import BaseParcelSerializer, BaseParcelListSerializer


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
    ({'title': 'test field 1', 'geometry': VALID_GEOJSON, 'area': 2.0 }),
    ({'title': 'test field 2', 'geometry': VALID_GEOJSON, 'area': 999.0 }),
    ({'title': None, 'geometry': VALID_GEOJSON, 'area': 1.0 }),
    ({'title': 'test field #$!"1', 'geometry': VALID_GEOJSON, 'area': 1.0 }),
]

VALID_INPUT_DATA_LIST = [
    [({'title': 'test field 1', 'geometry': VALID_GEOJSON, 'area': 2.0 }),
    ({'title': 'test field 2', 'geometry': VALID_GEOJSON, 'area': 999.0 }),],
    [({'title': 'test field 2', 'geometry': VALID_GEOJSON, 'area': 1.0 }),
    ({'title': 'test field #$!"1', 'geometry': VALID_GEOJSON, 'area': 1.0 }),]
]


INVALID_INPUT_DATA = [
    ({'title': None, 'geometry': None, 'area': 2.0 }, 'Field may not be null.', 'geometry'),
    ({'title': 'test field 2', 'geometry': VALID_GEOJSON, 'area': None }, 'Field may not be null.', 'area'),
    ({'title': 'test field 2', 'geometry': VALID_GEOJSON, 'area': 0 }, 'Field may not be 0 or less.', 'area'),
    ({'title': 'test field 2', 'geometry': VALID_GEOJSON, 'area': -10 }, 'Field may not be 0 or less.', 'area'),
]

INVALID_INPUT_DATA_LIST = [
    ([{'title': None, 'geometry': None, 'area': 2.0 }], 'Field may not be null.', 'geometry'),
    ([{'title': 'test field 2', 'geometry': VALID_GEOJSON, 'area': None}], 'Field may not be null.', 'area'),
    ([{'title': 'test field 2', 'geometry': VALID_GEOJSON, 'area': 0}], 'Field may not be 0 or less.', 'area'),
    ([{'title': 'test field 2', 'geometry': VALID_GEOJSON, 'area': -10}], 'Field may not be 0 or less.', 'area'),
]

class TestBaseParcelSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_inputs(self, input):
        input_data = copy.deepcopy(input)
        serializer = BaseParcelSerializer()
        serializer.load(input_data)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA)
    def test_invalid_inputs(self, input, msg, field):
        input_data = copy.deepcopy(input)
        serializer = BaseParcelSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input_data))
        assert msg in v.value.args[0][field]

    @pytest.mark.parametrize("input", VALID_INPUT_DATA)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)

        serializer = BaseParcelSerializer()
        m_result = serializer.load(input_data.copy())
        result = serializer.dump(m_result)
        assert result['title'] == input_data['title']
        assert result['area'] == str(input_data['area'])

@pytest.mark.usefixtures('soil')
class TestBaseParcelListSerializer:

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_inputs(self, input):
        input_data = copy.deepcopy(input)
        serializer = BaseParcelListSerializer()
        serializer.load(copy.deepcopy(input_data), many=True)

    @pytest.mark.parametrize("input,msg,field", INVALID_INPUT_DATA_LIST)
    def test_invalid_inputs(self, input, msg, field):
        input_data = copy.deepcopy(input)
        serializer = BaseParcelListSerializer()
        with pytest.raises(ValidationError) as v:
            serializer.load(copy.deepcopy(input_data), many=True)

    @pytest.mark.parametrize("input", VALID_INPUT_DATA_LIST)
    def test_valid_serialize_deserialize(self, input):
        input_data = copy.deepcopy(input)
        serializer = BaseParcelListSerializer()
        result = serializer.load(input_data.copy(), many=True)
        result = serializer.dump(result)
        for r, i in zip(result, input_data):
            assert r['title'] == i['title']
            assert r['area'] == str(i['area'])
